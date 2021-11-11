package com.swqualityboard.service;

import com.swqualityboard.dto.auth.LoginDto;
import com.swqualityboard.dto.auth.TokenDto;

public interface AuthService {
    TokenDto authorize(LoginDto loginDto);
}
