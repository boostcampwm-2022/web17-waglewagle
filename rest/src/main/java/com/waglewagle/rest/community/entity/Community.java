package com.waglewagle.rest.community.entity;


import com.waglewagle.rest.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Community {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User admin;

    private String title;

    private String summary;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAst;

    public static Community from(final String title,
                                 final String summary,
                                 final User user) {

        Community community = new Community();
        community.title = title;
        community.summary = summary;
        community.admin = user;
        return community;
    }
}
