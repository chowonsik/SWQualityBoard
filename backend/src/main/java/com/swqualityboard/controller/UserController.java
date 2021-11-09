package com.swqualityboard.controller;

import com.swqualityboard.dto.user.signup.SignUpInput;
import com.swqualityboard.entity.User;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    /**
     * 회원가입 API [POST] /api/users/signup
     *
     * @return ResponseEntity<Response<Object>>
     */
    // Body
    @PostMapping("/users/signup")
    public ResponseEntity<Response<Object>> signUp(@RequestBody @Valid SignUpInput signUpInput) {
        log.info("[POST] /api/users/signup");
        return userService.signUp(signUpInput);
    }

    /**
     * 유저 조회 API [GET] /api/users
     *
     * @return ResponseEntity<Response<Object>>
     */
    @GetMapping("/users")
    public ResponseEntity<Response<Object>> getUserInfo(@AuthenticationPrincipal String userEmail) {
        log.info("[GET] /api/users");
        return userService.getUserInfo(userEmail);
    }

}
