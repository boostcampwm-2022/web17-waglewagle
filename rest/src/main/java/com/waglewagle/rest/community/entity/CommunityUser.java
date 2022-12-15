package com.waglewagle.rest.community.entity;

import com.waglewagle.rest.community.data_object.dto.request.CommunityUserRequest;
import com.waglewagle.rest.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"community_id", "user_id"}
                )
        }
)
@Getter
@NoArgsConstructor
public class CommunityUser {
    @CreationTimestamp
    LocalDateTime createdAt;
    @UpdateTimestamp
    LocalDateTime updatedAt;
    LocalDateTime deletedAt;
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Community community;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    //유저의 커뮤니티별 추가 특성(멀티 프로필, ...)
    private String profileImageUrl;
    private String communityUsername;
    private Boolean isFirstVisit;

    public static CommunityUser from(final User user,
                                     final Community community) {

        CommunityUser communityUser = new CommunityUser();
        communityUser.user = user;
        communityUser.community = community;
        return communityUser;
    }

    public void
    updateProfile(final CommunityUserRequest.UpdateProfileDTO updateProfileDTO) {
        
        communityUsername = updateProfileDTO.getUsername();
        profileImageUrl = updateProfileDTO.getProfileImageUrl();
    }

    public void updateIsFirstVisit() {
        isFirstVisit = false;
    }
}
