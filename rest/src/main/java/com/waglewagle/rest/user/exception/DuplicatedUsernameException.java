package com.waglewagle.rest.user.exception;

import org.springframework.dao.DuplicateKeyException;

public class DuplicatedUsernameException extends DuplicateKeyException {
    public DuplicatedUsernameException() {
        super(ExceptionMessage.DUPLICATED_USERNAME.getMessage());
    }
}