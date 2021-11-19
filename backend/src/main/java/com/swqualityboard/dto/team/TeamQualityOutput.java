package com.swqualityboard.dto.team;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamQualityOutput {
    private TeamDto team;
    private int totalNumberPeople;
    private int reviewedNumberPeople;
    private int codeReviewRate;
    private int conventionRate;
    private int receptionRate;
    private int devLeadTime;
    private int deliveryRate;
    private String createdAt;
}
