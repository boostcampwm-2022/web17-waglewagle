package com.waglewagle.rest.community.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {

    NO_SUCH_COMMUNITY("커뮤니티를 찾을 수 없습니다."),
    ALREADY_JOINED_COMMUNITY("이미 가입한 커뮤니티입니다."),
    UNSUBSCRIBED_COMMUNITY("가입하지 않은 커뮤니티입니다.");

    private final String message;
}
