package com.swqualityboard.service;

import com.swqualityboard.dto.team.TeamQualityInput;
import com.swqualityboard.response.Response;
import org.springframework.http.ResponseEntity;

public interface TeamService {
    ResponseEntity<Response<Object>> selectTeamQuality(TeamQualityInput teamQualityInput);
    ResponseEntity<Response<Object>> selectTeamQualityAvg();
}
