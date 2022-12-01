package com.waglewagle.rest.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileDTO{

    private String profileImageUrl;

    private String username;

    public boolean isEmpty() {
        return this.getUsername() == null && this.getProfileImageUrl() == null;
    }
}