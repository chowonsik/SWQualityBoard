package com.swqualityboard.exception.system;


// resource가 존재하지 않을때 5xx 에러 대신에 HttpStatus.NOT_FOUND를 보낸다.
//@ResponseStatus(HttpStatus.NOT_FOUND)
public class SystemNotFoundException extends RuntimeException  {
    public SystemNotFoundException(String message) {
        super(message);
    }
}
