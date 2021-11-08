package com.display.swqualityboardbatch.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FunctionalSuitabilityDto {
    private String team;
    private String system;
    private int numberRequest;
    private int numberSuitableImplementation;
    private String date;
}
