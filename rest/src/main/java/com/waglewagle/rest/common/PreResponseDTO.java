package com.waglewagle.rest.common;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter()
public class PreResponseDTO <T extends Object> {

    private T data;
    private HttpStatus httpStatus;


    public PreResponseDTO (T data, HttpStatus httpStatus) {
        if (httpStatus == null) {
            throw new IllegalArgumentException();
        }

        this.data = data;
        this.httpStatus = httpStatus;
    }
}
