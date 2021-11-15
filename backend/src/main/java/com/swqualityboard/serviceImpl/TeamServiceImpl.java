package com.swqualityboard.serviceImpl;

import com.swqualityboard.dao.TeamRepository;
import com.swqualityboard.dto.team.TeamQualityAvgOutput;
import com.swqualityboard.dto.team.TeamQualityInput;
import com.swqualityboard.dto.team.TeamQualityOutput;
import com.swqualityboard.entity.TeamQuality;
import com.swqualityboard.exception.team.TeamNotFoundException;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import static com.swqualityboard.response.ResponseStatus.*;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

@Service("TeamService")
@RequiredArgsConstructor
@Slf4j
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    public List<TeamQualityOutput> selectTeamQuality(TeamQualityInput teamQualityInput) {

        MatchOperation matchOperation = Aggregation.match(Criteria.where("team_id").in(teamQualityInput.getTeams()).and("createdAt").gte(teamQualityInput.getStart()).lte(teamQualityInput.getEnd()));
        SortOperation sortOperation = sort(Sort.by(Sort.Direction.DESC, "createdAt").and(Sort.by(Sort.Direction.ASC, "team_id")));
        GroupOperation groupOperation = Aggregation.group("team_id", "createdAt")
                .first("team_id").as("team_id")
                .sum("totalNumberPeople").as("totalNumberPeople")
                .sum("reviewedNumberPeople").as("reviewedNumberPeople")
                .avg("conventionRate").as("conventionRate")
                .avg("receptionRate").as("receptionRate")
                .sum("devLeadTime").as("devLeadTime")
                .sum("numberRequest").as("numberRequest")
                .sum("numberOnTimeRequest").as("numberOnTimeRequest")
                .first("createdAt").as("createdAt");
        ProjectionOperation projectionOperation = Aggregation.project()
                .andExclude("_id")
                .andExclude("system_id");
        Aggregation aggregation = Aggregation.newAggregation(matchOperation, groupOperation, projectionOperation, sortOperation);
        List<TeamQuality> results = mongoTemplate.aggregate(aggregation, "team_quality", TeamQuality.class).getMappedResults();
        List<TeamQualityOutput> teamQualityOutputs = new ArrayList<>();
        for (TeamQuality teamQuality : results) {
            TeamQualityOutput teamQualityOutput = TeamQualityOutput.builder()
                    .team(teamRepository.findByTeamId(teamQuality.getTeamId()).orElseThrow(
                            () -> new TeamNotFoundException("해당 팀이 존재하지 않습니다.")
                    ))
                    .totalNumberPeople(teamQuality.getTotalNumberPeople())
                    .reviewedNumberPeople(teamQuality.getReviewedNumberPeople())
                    .codeReviewRate((int) ((double) teamQuality.getReviewedNumberPeople()/(double) teamQuality.getTotalNumberPeople()*100))
                    .conventionRate(teamQuality.getConventionRate())
                    .receptionRate(teamQuality.getReceptionRate())
                    .devLeadTime(teamQuality.getDevLeadTime())
                    .deliveryRate((int) ((double) teamQuality.getNumberOnTimeRequest()/(double) teamQuality.getNumberRequest()*100))
                    .createdAt(teamQuality.getCreatedAt())
                    .build();

            teamQualityOutputs.add(teamQualityOutput);
        }
        return teamQualityOutputs;
    }

    @Override
    public TeamQualityAvgOutput selectTeamQualityAvg() {
        SimpleDateFormat todaySdf = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
        Date date = new Date();
        String todayDate = todaySdf.format(date);
        MatchOperation matchOperation = Aggregation.match(Criteria.where("createdAt").is(todayDate));
        GroupOperation groupOperation = Aggregation.group("team_id", "createdAt")
                .first("team_id").as("team_id")
                .sum("totalNumberPeople").as("totalNumberPeople")
                .sum("reviewedNumberPeople").as("reviewedNumberPeople")
                .avg("conventionRate").as("conventionRate")
                .avg("receptionRate").as("receptionRate")
                .sum("devLeadTime").as("devLeadTime")
                .sum("numberRequest").as("numberRequest")
                .sum("numberOnTimeRequest").as("numberOnTimeRequest")
                .first("createdAt").as("createdAt");
        GroupOperation groupOperation2 = Aggregation.group("createdAt")
                .avg("totalNumberPeople").as("totalNumberPeople")
                .avg("reviewedNumberPeople").as("reviewedNumberPeople")
                .avg("conventionRate").as("conventionRate")
                .avg("receptionRate").as("receptionRate")
                .avg("devLeadTime").as("devLeadTime")
                .avg("numberRequest").as("numberRequest")
                .avg("numberOnTimeRequest").as("numberOnTimeRequest")
                .first("createdAt").as("createdAt");
        ProjectionOperation projectionOperation = Aggregation.project()
                .andExclude("_id")
                .andExclude("system_id");
        Aggregation aggregation = Aggregation.newAggregation(matchOperation, groupOperation, projectionOperation, groupOperation2);
        List<TeamQuality> results = mongoTemplate.aggregate(aggregation, "team_quality", TeamQuality.class).getMappedResults();
        List<TeamQualityAvgOutput> teamQualityAvgOutputs = new ArrayList<>();
        for (TeamQuality teamQuality : results) {
            TeamQualityAvgOutput teamQualityAvgOutput = TeamQualityAvgOutput.builder()
                    .totalNumberPeople(teamQuality.getTotalNumberPeople())
                    .reviewedNumberPeople(teamQuality.getReviewedNumberPeople())
                    .codeReviewRate((int) ((double) teamQuality.getReviewedNumberPeople()/(double) teamQuality.getTotalNumberPeople()*100))
                    .conventionRate(teamQuality.getConventionRate())
                    .receptionRate(teamQuality.getReceptionRate())
                    .devLeadTime(teamQuality.getDevLeadTime())
                    .deliveryRate((int) ((double) teamQuality.getNumberOnTimeRequest()/(double) teamQuality.getNumberRequest()*100))
                    .createdAt(teamQuality.getCreatedAt())
                    .build();

            teamQualityAvgOutputs.add(teamQualityAvgOutput);
        }
        return teamQualityAvgOutputs.get(0);
    }

}
