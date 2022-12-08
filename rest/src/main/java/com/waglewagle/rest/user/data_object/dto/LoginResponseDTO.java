package com.waglewagle.rest.user.data_object.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LoginResponseDTO {

    private final boolean success;
    private final Long userId;
}
