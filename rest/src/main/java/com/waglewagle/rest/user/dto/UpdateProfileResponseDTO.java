package com.waglewagle.rest.user.dto;

import com.waglewagle.rest.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileResponseDTO {

    public UpdateProfileResponseDTO(User user) {
        this.username = user.getUsername();
        this.profileImageUrl = user.getProfileImageUrl();
        this.userId = user.getId().toString();
    }

    private String username;
    private String profileImageUrl;
    private String userId;
}
