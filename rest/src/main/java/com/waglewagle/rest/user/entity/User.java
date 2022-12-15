package com.waglewagle.rest.user.entity;

import com.waglewagle.rest.user.data_object.dto.request.UserRequest;
import com.waglewagle.rest.user.enums.OauthMethod;
import com.waglewagle.rest.user.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(value = EnumType.STRING)
//    @Column(nullable = false, updatable = false)
    private OauthMethod oauthMethod;

    private String oauthKey;

    @Column(unique = true)
    private String username;

    private String email;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime lastActivity = LocalDateTime.now();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    @Builder
    public User(String username, String email, String profileImageUrl, Role role) {
        this.username = username;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.role = role;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setOauthMethod(OauthMethod oauthMethod) {
        this.oauthMethod = oauthMethod;
    }

    public void setOauthKey(String oauthKey) {
        this.oauthKey = oauthKey;
    }

    public void updateProfile(UserRequest.UpdateProfileDTO updateProfileDTO) {
        if (updateProfileDTO.getProfileImageUrl() != null) {
            profileImageUrl = updateProfileDTO.getProfileImageUrl();
        }

        if (updateProfileDTO.getUsername() != null) {
            username = updateProfileDTO.getUsername();
        }
    }

    public void updateLastActivity() {
        lastActivity = LocalDateTime.now();
    }
}

