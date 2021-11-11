package com.swqualityboard.exception.memo;

// 이미 존재하는 메모가 있을 경우 CONFLICT 에러 반환
//@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MemoDuplicateException extends RuntimeException {

    public MemoDuplicateException(String message) {
        super(message);
    }
}
