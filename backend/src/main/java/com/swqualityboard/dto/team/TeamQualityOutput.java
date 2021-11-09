package com.swqualityboard.dto.team;

import com.swqualityboard.entity.Memo;
import com.swqualityboard.entity.System;
import com.swqualityboard.entity.Team;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamQualityOutput {
    private Team team;
    private int totalNumberPeople;
    private int reviewedNumberPeople;
    private int codeReviewRate;
    private int conventionRate;
    private int receptionRate;
    private int devLeadTime;
    private int deliveryRate;
    private String createdAt;
}
