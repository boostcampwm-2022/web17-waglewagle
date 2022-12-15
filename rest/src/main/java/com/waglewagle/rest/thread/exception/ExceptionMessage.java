package com.waglewagle.rest.thread.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {

    NO_SUCH_THREAD("스레드를 찾을 수 없습니다."),
    IN_VALID_THREAD("유효한 스레드가 아닙니다.");

    private final String message;
}
