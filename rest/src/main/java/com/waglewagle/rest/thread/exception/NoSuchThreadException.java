package com.waglewagle.rest.thread.exception;

import java.util.NoSuchElementException;

public class NoSuchThreadException extends NoSuchElementException {

    public NoSuchThreadException() {
        super(ExceptionMessage.NO_SUCH_THREAD.getMessage());
    }
}