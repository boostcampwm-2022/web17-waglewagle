package com.waglewagle.rest.keyword;

import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.thread.Thread;
import com.waglewagle.rest.user.User;
import lombok.Getter;
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
}
