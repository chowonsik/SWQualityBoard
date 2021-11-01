package com.swqualityboard.dto.user.signup;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

public class SignUpInput {

    @NotEmpty
    @Size(min = 3, max = 50, message = "이메일을 올바르게 입력해주세요.")
    @Pattern(regexp = "\\S+@\\S+(.com)$")
    private String email;

    @NotEmpty
    @Size(min = 3, max = 20, message = "비밀번호는 3자이상 20자 이하로 입력해주세요.")
    private String password;

    @NotEmpty
    @Size(min = 2, max = 10, message = "이름을 올바르게 입력해주세요.")
    private String nickname;

    @NotEmpty(message = "권한을 입력해주세요.")
    private String role;
}
