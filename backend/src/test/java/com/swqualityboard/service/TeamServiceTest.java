package com.swqualityboard.service;

import com.swqualityboard.dao.TeamRepository;
import com.swqualityboard.dto.team.TeamDto;
import com.swqualityboard.dto.team.TeamQualityAvgOutput;
import com.swqualityboard.dto.team.TeamQualityInput;
import com.swqualityboard.dto.team.TeamQualityOutput;
import com.swqualityboard.entity.TeamQuality;
import com.swqualityboard.serviceImpl.TeamServiceImpl;
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
public class TeamServiceTest {
    @Mock
    TeamRepository teamRepository;
    @Mock
    MongoTemplate mongoTemplate;

    @InjectMocks
    TeamServiceImpl teamService;

    @DisplayName("팀 SW 품질지표 조회 성공")
    @Test
    public void 팀_SW_품질지표_조회_성공() throws Exception {
        //given
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        TeamDto teamDto = TeamDto.builder()
                .id("teamId")
                .name("A")
                .build();
        TeamQualityInput teamQualityInput = TeamQualityInput.builder()
                .teams(teams)
                .start("2021-10-04")
                .end("2021-10-04")
                .build();
        AggregationResults<TeamQuality> aggregationResultsMock = mock(AggregationResults.class);
        List<TeamQuality> results = new ArrayList<>();
        TeamQuality teamQuality = TeamQuality.builder()
                .id("teamQualityId")
                .teamId("teamId")
                .systemId("systemId")
                .totalNumberPeople(85)
                .reviewedNumberPeople(51)
                .conventionRate(58)
                .receptionRate(53)
                .devLeadTime(223)
                .numberRequest(222)
                .numberOnTimeRequest(122)
                .createdAt("2020-10-04")
                .build();
        results.add(teamQuality);

        given(mongoTemplate.aggregate(any(Aggregation.class), eq("team_quality"), eq(TeamQuality.class))).willReturn(aggregationResultsMock);
        given(aggregationResultsMock.getMappedResults()).willReturn(results);
        given(teamRepository.findByTeamId("teamId")).willReturn(Optional.of(teamDto));

        //when
        List<TeamQualityOutput> teamQualityOutputList = teamService.selectTeamQuality(teamQualityInput);

        //then
        assertEquals("teamId", teamQualityOutputList.get(0).getTeam().getId());
        verify(mongoTemplate, atLeastOnce()).aggregate(any(Aggregation.class), eq("team_quality"), eq(TeamQuality.class));
        verify(teamRepository, atLeastOnce()).findByTeamId("teamId");
    }

    @DisplayName("팀 평균 SW 품질지표 조회 성공")
    @Test
    public void 팀_평균_SW_품질지표_조회_성공() throws Exception {
        //given
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        AggregationResults<TeamQuality> aggregationResultsMock = mock(AggregationResults.class);
        List<TeamQuality> results = new ArrayList<>();
        TeamQuality teamQuality = TeamQuality.builder()
                .id("teamQualityId")
                .teamId("teamId")
                .systemId("systemId")
                .totalNumberPeople(85)
                .reviewedNumberPeople(51)
                .conventionRate(58)
                .receptionRate(53)
                .devLeadTime(223)
                .numberRequest(222)
                .numberOnTimeRequest(122)
                .createdAt("2020-10-04")
                .build();
        results.add(teamQuality);

        given(mongoTemplate.aggregate(any(Aggregation.class), eq("team_quality"), eq(TeamQuality.class))).willReturn(aggregationResultsMock);
        given(aggregationResultsMock.getMappedResults()).willReturn(results);

        //when
        TeamQualityAvgOutput teamQualityAvgOutputList = teamService.selectTeamQualityAvg();

        //then
        assertEquals("2020-10-04", teamQualityAvgOutputList.getCreatedAt());
        verify(mongoTemplate, atLeastOnce()).aggregate(any(Aggregation.class), eq("team_quality"), eq(TeamQuality.class));
    }

}
