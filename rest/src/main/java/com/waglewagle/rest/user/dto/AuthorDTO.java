package com.waglewagle.rest.user.dto;

import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.user.entity.User;
import lombok.Getter;

@Getter
public class AuthorDTO {
    private String userId;
    private String username;
    private String profileImageUrl;

    protected AuthorDTO() {
    }

    public static AuthorDTO createAuthorDTO(User user) {
        AuthorDTO authorDTO = new AuthorDTO();

        authorDTO.userId = user.getId().toString();
        authorDTO.username = user.getUsername();
        authorDTO.profileImageUrl = user.getProfileImageUrl();

        return authorDTO;
    }

    public static AuthorDTO createAuthorDTO(CommunityUser communityUser, User user) {
        AuthorDTO authorDTO = new AuthorDTO();

        authorDTO.userId = communityUser.getUser().getId().toString();
        authorDTO.username = communityUser.getCommunityUsername();
        authorDTO.profileImageUrl = communityUser.getProfileImageUrl();

        if (authorDTO.profileImageUrl == null) {
            authorDTO.profileImageUrl = user.getProfileImageUrl();
        }
        if (authorDTO.username == null) {
            authorDTO.username = user.getUsername();
        }

        return authorDTO;
    }
}
