package com.swqualityboard.dto.system;
import lombok.*;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SystemQualityInput {
    @NotNull(message = "시스템은 null 일 수 없습니다.")
    private List<String> systems;
    @NotNull(message = "시작일은 null 일 수 없습니다.")
    @Pattern(regexp = "\\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])")
    private String start;
    @NotNull(message = "종료일은 null 일 수 없습니다.")
    @Pattern(regexp = "\\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])")
    private String end;
}
