package com.waglewagle.rest.keyword.exception;

import java.util.NoSuchElementException;
public class NoSuchKeywordException extends NoSuchElementException {

    public NoSuchKeywordException() {
        super(ExceptionMessage.NO_SUCH_KEYWORD.getMessage());
    }
}