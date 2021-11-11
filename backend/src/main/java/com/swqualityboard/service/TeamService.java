package com.swqualityboard.service;

import com.swqualityboard.dto.team.TeamQualityAvgOutput;
import com.swqualityboard.dto.team.TeamQualityInput;
import com.swqualityboard.dto.team.TeamQualityOutput;

import java.util.List;

public interface TeamService {
    List<TeamQualityOutput> selectTeamQuality(TeamQualityInput teamQualityInput);
    TeamQualityAvgOutput selectTeamQualityAvg();
}
