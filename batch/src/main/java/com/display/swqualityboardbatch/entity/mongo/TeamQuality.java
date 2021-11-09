package com.display.swqualityboardbatch.entity.mongo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Builder
@Getter @Setter
@Document(collection = "team_quality")
public class TeamQuality {
    @Id
    private String id;
    private String team_id;
    private String system_id;
    private int totalNumberPeople;
    private int reviewedNumberPeople;
    private int conventionRate;
    private int receptionRate;
    private int devLeadTime;
    private int numberRequest;
    private int numberOnTimeRequest;
    private String createdAt;
    
}
