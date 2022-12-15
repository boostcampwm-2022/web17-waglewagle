package com.waglewagle.rest.thread.exception;

public class InvalidThreadException extends RuntimeException {
    public InvalidThreadException() {
        super(ExceptionMessage.IN_VALID_THREAD.getMessage());
    }
}
