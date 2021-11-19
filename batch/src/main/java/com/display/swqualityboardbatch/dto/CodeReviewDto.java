package com.display.swqualityboardbatch.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CodeReviewDto {
    private String team;
    private String system;
    private int totalNumberPeople;
    private int reviewedNumberPeople;
    private String date;
}
