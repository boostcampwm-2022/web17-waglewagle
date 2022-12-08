package com.waglewagle.rest.user.data_object.dto;

import com.waglewagle.rest.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileResponseDTO {

    private String username;
    private String profileImageUrl;
    private String userId;

    public UpdateProfileResponseDTO(User user) {
        this.username = user.getUsername();
        this.profileImageUrl = user.getProfileImageUrl();
        this.userId = user.getId().toString();
    }
}
