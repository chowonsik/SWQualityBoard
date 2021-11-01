package com.swqualityboard.service;

import com.swqualityboard.dto.auth.LoginDto;
import com.swqualityboard.dto.auth.TokenDto;
import com.swqualityboard.response.Response;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<Response<TokenDto>> authorize(LoginDto loginDto);
}
