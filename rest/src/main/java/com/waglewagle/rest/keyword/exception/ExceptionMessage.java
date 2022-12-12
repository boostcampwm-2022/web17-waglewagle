package com.waglewagle.rest.keyword.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {

    NO_SUCH_KEYWORD("키워드를 찾을 수 없습니다."),
    ALREADY_JOINED_KEYWORD("이미 가입한 키워드입니다."),
    DUPLICATED_KEYWORD("이미 존재하는 키워드입니다.");

    private final String message;
}
