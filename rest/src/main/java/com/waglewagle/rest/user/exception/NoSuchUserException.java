package com.waglewagle.rest.user.exception;

import java.util.NoSuchElementException;

public class NoSuchUserException extends NoSuchElementException {

    public NoSuchUserException() {
        super(ExceptionMessage.NO_SUCH_USER.getMessage());
    }
}