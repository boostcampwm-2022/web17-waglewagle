package com.waglewagle.rest.keyword.exception;

import org.springframework.dao.DuplicateKeyException;

public class AlreadyJoinedKeywordException extends DuplicateKeyException {
    public AlreadyJoinedKeywordException() {
        super(ExceptionMessage.ALREADY_JOINED_KEYWORD.getMessage());
    }
}