package com.swqualityboard.exception.user;

// 이미 존재하는 nickname 가입시도 시 BAD_REQUEST 에러 반환
//@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserDuplicateNicknameException extends RuntimeException {

    public UserDuplicateNicknameException(String message) {
        super(message);
    }
}
