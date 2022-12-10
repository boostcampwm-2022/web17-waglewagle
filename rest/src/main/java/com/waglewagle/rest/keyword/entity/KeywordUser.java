package com.waglewagle.rest.keyword.entity;

import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.keyword.data_object.KeywordVO;
import com.waglewagle.rest.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KeywordUser {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    private Community community;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    public static KeywordUser of(final KeywordVO.JoinVO joinVO) {
        KeywordUser keywordUser = new KeywordUser();
        keywordUser.community = joinVO.getCommunity();
        keywordUser.keyword = joinVO.getKeyword();
        keywordUser.user = joinVO.getUser();
        return keywordUser;
    }
}
