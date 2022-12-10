package com.waglewagle.rest.keyword.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {

    NO_SUCH_KEYWORD("키워드를 찾을 수 없습니다.");

    private final String message;
}
