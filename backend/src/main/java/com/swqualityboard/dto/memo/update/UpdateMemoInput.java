package com.swqualityboard.dto.memo.update;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMemoInput {
    @NotBlank(message = "내용을 입력해 주세요.")
    private String content;
}
