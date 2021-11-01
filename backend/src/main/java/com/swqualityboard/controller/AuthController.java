package com.swqualityboard.controller;

import com.swqualityboard.dto.auth.LoginDto;
import com.swqualityboard.dto.auth.TokenDto;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    /**
     * 로그인 API [POST] /api/authenticate
     * 
     * @return ResponseEntity<<Response<TokenDto>>
     */
    // Body
    @PostMapping("/authenticate")
    public ResponseEntity<Response<TokenDto>> authorize(@RequestBody LoginDto loginDto) {
        log.info("[POST] /api/authenticate");
        return authService.authorize(loginDto);
    }



}
