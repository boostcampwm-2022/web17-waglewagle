package com.waglewagle.rest.user.dto;

import com.waglewagle.rest.user.entity.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserConnectionStatusDTO {

    private String userId;
    private String username;
    private String profileImageUrl;
    private LocalDateTime lastActivity;

    public static UserConnectionStatusDTO of(User user) {
        UserConnectionStatusDTO userConnectionStatusDTO = new UserConnectionStatusDTO();
        userConnectionStatusDTO.userId = user.getId().toString();
        userConnectionStatusDTO.username = user.getUsername();
        userConnectionStatusDTO.profileImageUrl = user.getProfileImageUrl();
        userConnectionStatusDTO.lastActivity = user.getLastActivity();
        return userConnectionStatusDTO;
    }
}
