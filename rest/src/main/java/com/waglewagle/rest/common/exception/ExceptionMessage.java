package com.waglewagle.rest.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {

    INVALID_INPUT("유효하지 않은 입력입니다.");

    private final String message;
}
