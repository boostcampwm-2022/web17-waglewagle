package com.waglewagle.rest.community.exception;

import java.util.NoSuchElementException;

public class NoSuchCommunityException extends NoSuchElementException {
    public NoSuchCommunityException() {
        super(ExceptionMessage.NO_SUCH_COMMUNITY.getMessage());
    }
}