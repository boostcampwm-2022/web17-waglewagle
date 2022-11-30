package com.waglewagle.rest.config.auth.dto;

import com.waglewagle.rest.user.Role;
import com.waglewagle.rest.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String username;
    private String email;
    private String profileImageUrl;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey,
                           String username,
                           String email,
                           String profileImageUrl) {
        this.attributes = attributes;
        this.nameAttributeKey =nameAttributeKey;
        this.username = username;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
    }

    public static OAuthAttributes of(String registrationId,
                                     String userNameAttributeName,
                                     Map<String, Object> attributes) {
        return ofGithub(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGithub(String userNameAttributeName,
                                            Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .username((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .profileImageUrl((String) attributes.get("avatar_url"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity() {
        return User.builder()
                .username(username)
                .email(email)
                .profileImageUrl(profileImageUrl)
                .role(Role.USER)
                .build(); //TODO: 필드 이걸로 돼?
    }
}
