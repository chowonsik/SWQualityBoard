package com.swqualityboard.controller;

import com.swqualityboard.dto.team.TeamQualityAvgOutput;
import com.swqualityboard.dto.team.TeamQualityInput;
import com.swqualityboard.dto.team.TeamQualityOutput;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.util.List;

import static com.swqualityboard.response.ResponseStatus.SUCCESS_SELECT_TEAM_QUALITY;
import static com.swqualityboard.response.ResponseStatus.SUCCESS_SELECT_TEAM_QUALITY_AVG;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class TeamController {

    private final TeamService teamService;

    /**
     * 팀 SW 품질 리스트 조회 API [GET] /api/team-quality
     *
     * @return ResponseEntity<Response<Object>>
     */
    // Params
    @GetMapping("/team-quality")
    public ResponseEntity<Response<List<TeamQualityOutput>>> selectTeamQuality(@Valid TeamQualityInput teamQualityInput) {
        log.info("[GET] /api/team-quality");
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(teamService.selectTeamQuality(teamQualityInput), SUCCESS_SELECT_TEAM_QUALITY));
    }

    /**
     * 팀 SW 품질 평균 리스트 조회 API [GET] /api/team-quality/average
     *
     * @return ResponseEntity<Response<Object>>
     */
    // Params
    @GetMapping("/team-quality/average")
    public ResponseEntity<Response<TeamQualityAvgOutput>> selectTeamAvgQuality() {
        log.info("[GET] /api/team-quality/average");
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(teamService.selectTeamQualityAvg(), SUCCESS_SELECT_TEAM_QUALITY_AVG));
    }

}
