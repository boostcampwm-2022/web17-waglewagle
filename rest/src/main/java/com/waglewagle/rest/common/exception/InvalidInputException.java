package com.waglewagle.rest.common.exception;

public class InvalidInputException extends RuntimeException {
    public InvalidInputException() {
        super(ExceptionMessage.INVALID_INPUT.getMessage());
    }
}
