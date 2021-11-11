package com.swqualityboard.controller;

import com.swqualityboard.dto.user.select.UserInfoOutput;
import com.swqualityboard.dto.user.signup.SignUpInput;
import com.swqualityboard.entity.User;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.swqualityboard.response.ResponseStatus.CREATED_USER;
import static com.swqualityboard.response.ResponseStatus.SUCCESS_SELECT_USER;

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
        userService.signUp(signUpInput);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new Response<>(null, CREATED_USER));
    }

    /**
     * 유저 조회 API [GET] /api/users
     *
     * @return ResponseEntity<Response<Object>>
     */
    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('DEVELOPER','ADMIN','EXECUTIVE')")
    public ResponseEntity<Response<UserInfoOutput>> getUserInfo(@AuthenticationPrincipal String userEmail) {
        log.info("[GET] /api/users");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new Response<>(userService.getUserInfo(userEmail), SUCCESS_SELECT_USER));
    }

}
