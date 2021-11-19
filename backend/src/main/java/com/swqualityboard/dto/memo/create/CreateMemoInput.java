package com.swqualityboard.dto.memo.create;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateMemoInput {
    @NotBlank(message = "시스템 품질지표 이력 번호를 입력해 주세요.")
    private String systemQualityId;
    @NotBlank(message = "내용을 입력해 주세요.")
    private String content;
}
