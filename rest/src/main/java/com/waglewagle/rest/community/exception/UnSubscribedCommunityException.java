package com.waglewagle.rest.community.exception;

public class UnSubscribedCommunityException extends RuntimeException {
    public UnSubscribedCommunityException() {
        super(ExceptionMessage.UNSUBSCRIBED_COMMUNITY.getMessage());
    }
}
