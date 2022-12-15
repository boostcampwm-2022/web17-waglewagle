package com.waglewagle.rest.user.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException() {
        super(ExceptionMessage.UNAUTHORIZED.getMessage());
    }

}

