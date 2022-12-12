package com.waglewagle.rest.user.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {

    NO_SUCH_USER("유저를 찾을 수 없습니다."),
    UNAUTHORIZED("권한이 없습니다."),
    DUPLICATED_USERNAME("이미 사용 중인 username입니다.");

    private final String message;
}
