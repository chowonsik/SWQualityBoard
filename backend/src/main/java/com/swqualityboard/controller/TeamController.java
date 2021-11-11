package com.swqualityboard.controller;

import com.swqualityboard.dto.team.TeamQualityInput;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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
    public ResponseEntity<Response<Object>> selectTeamQuality(@Valid TeamQualityInput teamQualityInput) {
        log.info("[GET] /api/team-quality");
        return teamService.selectTeamQuality(teamQualityInput);
    }

}
