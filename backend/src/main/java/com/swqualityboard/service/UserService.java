package com.swqualityboard.service;

import com.swqualityboard.dto.user.signup.SignUpInput;
import com.swqualityboard.entity.User;
import com.swqualityboard.response.Response;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<Response<Object>> signUp(SignUpInput signUpInput);
    ResponseEntity<Response<User>> getUserWithAuthorities(String username);
    ResponseEntity<Response<User>> getMyUserWithAuthorities();
}
