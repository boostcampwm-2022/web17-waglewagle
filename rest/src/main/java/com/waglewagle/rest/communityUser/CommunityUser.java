package com.waglewagle.rest.communityUser;

import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class CommunityUser {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Community community;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String ProfileImageUrl;

    private String communityUsername;

    @CreationTimestamp
    LocalDateTime createdAt;

    @UpdateTimestamp
    LocalDateTime updatedAt;

    LocalDateTime deletedAt;

    public CommunityUser (User user, Community community) {
        this.user = user;
        this.community = community;
    }
}
