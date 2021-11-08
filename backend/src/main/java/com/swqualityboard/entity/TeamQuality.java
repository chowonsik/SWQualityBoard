package com.swqualityboard.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Builder
@Getter @Setter
@Document(collection = "team_quality")
public class TeamQuality {
    @Id
    private String id;
    @Field("team_id")
    private String teamId;
    @Field("system_id")
    private String systemId;
    private int totalNumberPeople;
    private int reviewedNumberPeople;
    private int conventionRate;
    private int receptionRate;
    private int devLeadTime;
    private int numberRequest;
    private int numberOnTimeRequest;
    private String createdAt;
    
}
