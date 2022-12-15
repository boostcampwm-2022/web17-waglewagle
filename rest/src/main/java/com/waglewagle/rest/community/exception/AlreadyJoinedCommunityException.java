package com.waglewagle.rest.community.exception;

import org.springframework.dao.DuplicateKeyException;

public class AlreadyJoinedCommunityException extends DuplicateKeyException {
    public AlreadyJoinedCommunityException() {
        super(ExceptionMessage.ALREADY_JOINED_COMMUNITY.getMessage());
    }
}