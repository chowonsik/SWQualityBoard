package com.swqualityboard.controller;

import com.swqualityboard.dto.user.signup.SignUpInput;
import com.swqualityboard.entity.User;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Response<Object>> signUp(@RequestBody SignUpInput signUpInput) {
        log.info("[POST] /api/users/signup");
        return userService.signUp(signUpInput);
    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('DEVELOPER','ADMIN','EXECUTIVE')")
    public ResponseEntity<Response<User>> getMyUserInfo() {
        return userService.getMyUserWithAuthorities();
    }

    @GetMapping("/users/{username}")
    @PreAuthorize("hasAnyRole('DEVELOPER')")
    public ResponseEntity<Response<User>> getUserInfo(@PathVariable String username) {
        return userService.getUserWithAuthorities(username);
    }

}
