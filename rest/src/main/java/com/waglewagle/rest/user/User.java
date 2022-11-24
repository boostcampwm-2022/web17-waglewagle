package com.waglewagle.rest.user;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
public class User {

    @Id @GeneratedValue
    private Long id;

    @Enumerated(value= EnumType.STRING)
    @Column(nullable = false, updatable = false)
    private OauthMethod oauthMethod;

    private String oauthKey;

    @Column(unique = true)
    private String username;

    private String profileImageUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setOauthMethod(OauthMethod oauthMethod) {
        this.oauthMethod = oauthMethod;
    }

    public void setOauthKey(String oauthKey) {
        this.oauthKey = oauthKey;
    }
}

