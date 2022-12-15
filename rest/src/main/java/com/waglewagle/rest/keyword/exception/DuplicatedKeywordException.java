package com.waglewagle.rest.keyword.exception;

import org.springframework.dao.DuplicateKeyException;

public class DuplicatedKeywordException extends DuplicateKeyException {
    public DuplicatedKeywordException() {
        super(ExceptionMessage.DUPLICATED_KEYWORD.getMessage());
    }
}