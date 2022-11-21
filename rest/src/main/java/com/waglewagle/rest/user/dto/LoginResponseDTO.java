package com.waglewagle.rest.user.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LoginResponseDTO {

    private final boolean success;
    private final Long userId;
}
