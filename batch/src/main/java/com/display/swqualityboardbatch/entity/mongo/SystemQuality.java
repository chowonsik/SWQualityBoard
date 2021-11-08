package com.display.swqualityboardbatch.entity.mongo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Builder
@Getter @Setter
@Document(collection = "system_quality")
public class SystemQuality {
    @Id
    private String id;
    private String system_id;
    private int critical;
    private int high;
    private int medium;
    private int low;
    private int complexity;
    private int overlapping;
    private int scale;
    private int testCoverage;
    private int numberRequest;
    private int numberSuitableImplementation;
    private int mtbf;
    private String createdAt;
    
}
