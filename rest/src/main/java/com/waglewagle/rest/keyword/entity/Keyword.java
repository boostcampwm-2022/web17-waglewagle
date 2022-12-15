package com.waglewagle.rest.keyword.entity;

import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.keyword.data_object.KeywordVO.CreateVO;
import com.waglewagle.rest.thread.entity.Thread;
import com.waglewagle.rest.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"community_id", "keyword"}
                )
        }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Keyword {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User author;

    @ManyToOne(fetch = FetchType.LAZY)
    private Community community;

    private String keyword;

    @OneToMany(mappedBy = "id")
    private List<Thread> threads = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    @OneToMany(mappedBy = "keyword", cascade = CascadeType.ALL)
    private List<KeywordUser> keywordUsers = new ArrayList<>();

    public static Keyword of(final CreateVO createVO) {
        Keyword keyword = new Keyword();
        keyword.author = createVO.getAuthor();
        keyword.community = createVO.getCommunity();
        keyword.keyword = createVO.getKeywordName();
        return keyword;
    }

    public void
    addKeywordUser(final KeywordUser keywordUser) {
        keywordUsers.add(keywordUser);
    }
}
