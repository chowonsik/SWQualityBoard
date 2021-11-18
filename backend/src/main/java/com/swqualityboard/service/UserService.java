package com.swqualityboard.service;

import com.swqualityboard.dto.user.select.UserInfoOutput;
import com.swqualityboard.dto.user.signup.SignUpInput;

public interface UserService {
    void signUp(SignUpInput signUpInput);
    UserInfoOutput getUserInfo(String email);
}
