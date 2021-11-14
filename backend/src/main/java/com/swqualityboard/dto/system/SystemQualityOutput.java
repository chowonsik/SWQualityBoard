package com.swqualityboard.dto.system;

import com.swqualityboard.dto.memo.MemoDto;
import lombok.*;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SystemQualityOutput {
    private String id;
    private SystemDto system;
    private MemoDto memo;
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
    private int functionalCompatibility;
    private int mtbf;
    private String createdAt;
}
