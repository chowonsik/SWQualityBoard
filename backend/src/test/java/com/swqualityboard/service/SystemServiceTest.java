package com.swqualityboard.service;

import com.swqualityboard.dao.*;
import com.swqualityboard.dto.memo.MemoDto;
import com.swqualityboard.dto.system.SystemDto;
import com.swqualityboard.dto.system.SystemQualityInput;
import com.swqualityboard.dto.system.SystemQualityOutput;
import com.swqualityboard.entity.*;
import com.swqualityboard.serviceImpl.SystemServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
public class SystemServiceTest {
    @Mock
    UserRepository userRepository;
    @Mock
    SystemRepository systemRepository;
    @Mock
    MemoRepository memoRepository;
    @Mock
    MongoTemplate mongoTemplate;

    @InjectMocks
    SystemServiceImpl systemService;

    @DisplayName("시스템 SW 품질지표 조회 성공")
    @Test
    public void 시스템_SW_품질지표_조회_성공() throws Exception {
        //given
        Set<Authority> authorities = new HashSet<>();
        Authority authority = Authority.builder()
                .id("617efacc17060cc9e4117d75")
                .role("ROLE_ADMIN")
                .build();
        authorities.add(authority);
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        List<String> systems = new ArrayList<>();
        systems.add("systemId");
        User user = User.builder()
                .id("userId")
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .status("ACTIVATE")
                .authorities(authorities)
                .teams(teams)
                .build();
        SystemDto systemDto = SystemDto.builder()
                .id("systemId")
                .name("A")
                .build();
        SystemQualityInput systemQualityInput = SystemQualityInput.builder()
                .systems(systems)
                .start("2021-10-04")
                .end("2021-10-04")
                .build();
        AggregationResults<SystemQuality> aggregationResultsMock = mock(AggregationResults.class);
        List<SystemQuality> results = new ArrayList<>();
        SystemQuality systemQuality = SystemQuality.builder()
                .id("systemQualityId")
                .systemId("systemId")
                .critical(0)
                .high(0)
                .medium(3)
                .low(6)
                .complexity(4)
                .overlapping(4)
                .scale(2)
                .testCoverage(73)
                .numberRequest(42)
                .numberSuitableImplementation(22)
                .mtbf(440)
                .createdAt("2020-10-04")
                .build();
        results.add(systemQuality);
        MemoDto memoDto = MemoDto.builder()
                .id("6184c7e317060cc9e4117dc9")
                .content("테스트입니다")
                .build();

        given(userRepository.findByEmailAndStatus("test@gmail.com","ACTIVATE")).willReturn(Optional.of(user));
        given(mongoTemplate.aggregate(any(Aggregation.class), eq("system_quality"), eq(SystemQuality.class))).willReturn(aggregationResultsMock);
        given(aggregationResultsMock.getMappedResults()).willReturn(results);
        given(systemRepository.findBySystemId("systemId")).willReturn(Optional.of(systemDto));
        given(memoRepository.findByMemo("systemQualityId", user.getId())).willReturn(Optional.ofNullable(memoDto));

        //when
        List<SystemQualityOutput> systemQualityOutputList = systemService.selectSystemQuality("test@gmail.com", systemQualityInput);

        //then
        assertEquals("systemQualityId", systemQualityOutputList.get(0).getId());
        verify(userRepository, atLeastOnce()).findByEmailAndStatus("test@gmail.com","ACTIVATE");
        verify(mongoTemplate, atLeastOnce()).aggregate(any(Aggregation.class), eq("system_quality"), eq(SystemQuality.class));
        verify(systemRepository, atLeastOnce()).findBySystemId("systemId");
        verify(memoRepository, atLeastOnce()).findByMemo("systemQualityId", user.getId());
    }

}
