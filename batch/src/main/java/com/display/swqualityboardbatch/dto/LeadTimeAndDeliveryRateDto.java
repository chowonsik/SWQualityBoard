package com.display.swqualityboardbatch.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LeadTimeAndDeliveryRateDto {
    private String team;
    private String system;
    private int devLeadTime;
    private int numberRequest;
    private int numberOnTimeRequest;
    private String date;
}
