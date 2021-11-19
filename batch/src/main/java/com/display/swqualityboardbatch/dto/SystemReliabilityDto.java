package com.display.swqualityboardbatch.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SystemReliabilityDto {
    private String team;
    private String system;
    private int mtbf;
    private String date;
}
