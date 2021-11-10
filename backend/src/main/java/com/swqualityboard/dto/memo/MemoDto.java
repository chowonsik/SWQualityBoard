package com.swqualityboard.dto.memo;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemoDto {
    private String id;
    private String content;
}
