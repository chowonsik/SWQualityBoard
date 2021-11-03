package com.swqualityboard.dto.auth;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginDto {
    @NotNull
    @Size(min = 3, max = 50, message = "email은 3자 이상 50자 이하로 작성해주세요")
    private String email;

    @NotNull
    @Size(min = 3, max = 100, message = "패스워드는 3자 이상 100자 이하로 작성해주세요")
    private String password;
}
