package com.display.swqualityboardbatch.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ConventionRateDto {
    private String team;
    private String system;
    private int rate;
    private String date;
}
