package com.swqualityboard.serviceImpl;

import com.swqualityboard.dao.MemoRepository;
import com.swqualityboard.dao.SystemRepository;
import com.swqualityboard.dao.UserRepository;
import com.swqualityboard.dto.memo.create.CreateMemoInput;
import com.swqualityboard.dto.system.SystemQualityInput;
import com.swqualityboard.dto.system.SystemQualityOutput;
import com.swqualityboard.entity.Memo;
import com.swqualityboard.entity.SystemQuality;
import com.swqualityboard.entity.User;
import com.swqualityboard.exception.memo.MemoDuplicateException;
import com.swqualityboard.exception.system.SystemNotFoundException;
import com.swqualityboard.exception.user.UserNotFoundException;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.MemoService;
import com.swqualityboard.service.SystemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.swqualityboard.response.ResponseStatus.CREATED_MEMO;
import static com.swqualityboard.response.ResponseStatus.SUCCESS_SELECT_SYSTEM;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

@Service("MemoService")
@RequiredArgsConstructor
@Slf4j
public class MemoServiceImpl implements MemoService {

    private final MemoRepository memoRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<Response<Object>> createMemo(String email, CreateMemoInput createMemoInput) {

        User user = userRepository.findByEmailAndStatus(email, "ACTIVATE").orElseThrow(
                () -> new UserNotFoundException("해당하는 이메일이 존재하지 않습니다.")
        );

        if (memoRepository.existsBySystemQualityIdAndUserId(createMemoInput.getSystemQualityId(), user.getId())) {
            throw new MemoDuplicateException("해당 SW 품질지표 이력에 이미 메모가 존재합니다.");
        }

        Memo memo = Memo.builder()
                .systemQualityId(createMemoInput.getSystemQualityId())
                .userId(user.getId())
                .content(createMemoInput.getContent())
                .build();

        memoRepository.save(memo);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new Response<>(null, CREATED_MEMO));
    }

}
