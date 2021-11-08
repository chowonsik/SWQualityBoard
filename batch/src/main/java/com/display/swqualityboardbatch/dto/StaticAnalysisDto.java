package com.display.swqualityboardbatch.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class StaticAnalysisDto {
    private String team;
    private String system;
    private int critical;
    private int high;
    private int medium;
    private int low;
    private int testCoverage;
    private int complexity;
    private int overlapping;
    private int scale;
    private String date;
}
