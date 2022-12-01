package com.waglewagle.rest.user;

import com.waglewagle.rest.user.dto.UpdateProfileDTO;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id @GeneratedValue
    private Long id;

    @Enumerated(value= EnumType.STRING)
//    @Column(nullable = false, updatable = false)
    private OauthMethod oauthMethod;

    private String oauthKey;

    @Column(unique = true)
    private String username;

    private String email;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    @Builder
    public User(String username, String email, String profileImageUrl, Role role) {
        this.username = username;
        this.email = email;
        this.profileImageUrl =profileImageUrl;
        this.role = role;
    }

    public User update(String username, String profileImageUrl) {
        this.username = username;
        this.profileImageUrl = profileImageUrl;

        return this;
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

    public void updateProfile(UpdateProfileDTO updateProfileDTO) {
        if (updateProfileDTO.getProfileImageUrl() != null){
            profileImageUrl = updateProfileDTO.getProfileImageUrl();
        }

        if (updateProfileDTO.getUsername() != null){
            username = updateProfileDTO.getUsername();
        }
    }
}

