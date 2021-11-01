package com.swqualityboard.exception;

import com.swqualityboard.exception.user.AuthorityNotFoundException;
import com.swqualityboard.exception.user.UnauthorizedException;
import com.swqualityboard.exception.user.UserDuplicateEmailException;
import com.swqualityboard.exception.user.UserDuplicateNicknameException;
import com.swqualityboard.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static com.swqualityboard.response.ResponseStatus.*;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    // Valid 조건을 만족하지 못한 요청에 대한 에러 핸들러
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status,
        WebRequest request) {
        log.debug("Vaildation failed", ex);
        return new ResponseEntity<>(new Response<>(VALIDATION_FAILED), HttpStatus.BAD_REQUEST);
    }

    // 이미 존재하는 Email 가입에 대한 에러 핸들러
    @ExceptionHandler(UserDuplicateEmailException.class)
    public final ResponseEntity<Object> handleUserDuplicateEmailException(
            UserDuplicateEmailException ex) {
        log.debug("중복된 Email", ex);
        return new ResponseEntity<>(new Response<>(EXISTS_EMAIL), HttpStatus.CONFLICT);
    }

    // 이미 존재하는 Nickname 가입에 대한 에러 핸들러
    @ExceptionHandler(UserDuplicateNicknameException.class)
    public final ResponseEntity<Object> handleUserDuplicateNicknameException(
            UserDuplicateNicknameException ex) {
        log.debug("중복된 Nickname", ex);
        return new ResponseEntity<>(new Response<>(EXISTS_NICKNAME), HttpStatus.CONFLICT);
    }

    // 탈퇴한 회원
    @ExceptionHandler(UnauthorizedException.class)
    public final ResponseEntity<Object> handleUnauthorizedException(UnauthorizedException ex) {
        log.debug("인증되지 않은 유저입니다.", ex);
        return new ResponseEntity<>(new Response<>(UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }

    // 존재하지 않는 권한 조회에 대한 에러 핸들러
    @ExceptionHandler(AuthorityNotFoundException.class)
    public final ResponseEntity<Object> handleAuthorityNotFoundException(
            AuthorityNotFoundException ex) {
        log.debug("존재하지 않는 권한", ex);
        return new ResponseEntity<>(new Response<>(NOT_FOUND_AUTHORITY), HttpStatus.NOT_FOUND);
    }

}
