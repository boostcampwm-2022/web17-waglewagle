package com.waglewagle.rest.community.entity;

import com.waglewagle.rest.community.data_object.dto.CommunityUserDTO.UpdateCommunityProfileInputDTO;
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

    public CommunityUser(User user, Community community) {
        this.user = user;
        this.community = community;
        isFirstVisit = true;
    }

    public void updateProfile(UpdateCommunityProfileInputDTO updateCommunityProfileInputDTO) {
        communityUsername = updateCommunityProfileInputDTO.getUsername();
        profileImageUrl = updateCommunityProfileInputDTO.getProfileImageUrl();
    }

    public void updateIsFirstVisit() {
        isFirstVisit = false;
    }
}
