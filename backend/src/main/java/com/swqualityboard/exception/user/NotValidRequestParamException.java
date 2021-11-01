package com.swqualityboard.exception.user;

// 잘못된 파라미터가 들어온 경우 BAD_REQUEST 에러 반환
//@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotValidRequestParamException extends RuntimeException {

    public NotValidRequestParamException(String message) {
        super(message);
    }
}
