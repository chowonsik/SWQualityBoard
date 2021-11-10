package com.swqualityboard.serviceImpl;

import com.swqualityboard.dao.*;
import com.swqualityboard.dto.system.SystemQualityInput;
import com.swqualityboard.dto.system.SystemQualityOutput;
import com.swqualityboard.entity.*;
import com.swqualityboard.exception.system.SystemNotFoundException;
import com.swqualityboard.exception.user.UserNotFoundException;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.SystemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.swqualityboard.response.ResponseStatus.*;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

@Service("SystemService")
@RequiredArgsConstructor
@Slf4j
public class SystemServiceImpl implements SystemService {

    private final SystemRepository systemRepository;
    private final MemoRepository memoRepository;
    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    public ResponseEntity<Response<Object>> selectSystemQuality(String email, SystemQualityInput systemQualityInput) {

        User user = userRepository.findByEmailAndStatus(email, "ACTIVATE").orElseThrow(
                () -> new UserNotFoundException("해당하는 이메일이 존재하지 않습니다.")
        );
        MatchOperation matchOperation = Aggregation.match(Criteria.where("system_id").in(systemQualityInput.getSystems()).and("createdAt").gte(systemQualityInput.getStart()).lte(systemQualityInput.getEnd()));
        SortOperation sortOperation = sort(Sort.by(Sort.Direction.DESC, "createdAt"));
        Aggregation aggregation = Aggregation.newAggregation(matchOperation, sortOperation);
        List<SystemQuality> results = mongoTemplate.aggregate(aggregation, "system_quality", SystemQuality.class).getMappedResults();

        List<SystemQualityOutput> systemQualityOutputs = new ArrayList<>();
        for (SystemQuality systemQuality : results) {
            SystemQualityOutput systemQualityOutput = SystemQualityOutput.builder()
                    .id(systemQuality.getId())
                    .system(systemRepository.findById(systemQuality.getSystemId()).orElseThrow(
                            () -> new SystemNotFoundException("해당 시스템이 존재하지 않습니다.")
                    ))
                    .memo(memoRepository.findBySystemQualityIdAndUserId(systemQuality.getId(), user.getId()).orElse(null))
                    .critical(systemQuality.getCritical())
                    .high(systemQuality.getHigh())
                    .medium(systemQuality.getMedium())
                    .low(systemQuality.getLow())
                    .complexity(systemQuality.getComplexity())
                    .overlapping(systemQuality.getOverlapping())
                    .scale(systemQuality.getScale())
                    .testCoverage(systemQuality.getTestCoverage())
                    .numberRequest(systemQuality.getNumberRequest())
                    .numberSuitableImplementation(systemQuality.getNumberSuitableImplementation())
                    .functionalCompatibility((int) ((double) systemQuality.getNumberSuitableImplementation()/(double) systemQuality.getNumberRequest()*100))
                    .mtbf(systemQuality.getMtbf())
                    .createdAt(systemQuality.getCreatedAt()).build();
            systemQualityOutputs.add(systemQualityOutput);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(systemQualityOutputs, SUCCESS_SELECT_SYSTEM));
    }

}
