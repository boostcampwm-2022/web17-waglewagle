package com.waglewagle.rest.user.dto;

import com.waglewagle.rest.user.User;
import lombok.Getter;

@Getter
public class UserInfoDTO {

    public UserInfoDTO(User user) {
        userId = user.getId().toString();
        username= user.getUsername();
        profileImageUrl = user.getProfileImageUrl();

    }

    private String userId;
    private String username;
    private String profileImageUrl;
}
