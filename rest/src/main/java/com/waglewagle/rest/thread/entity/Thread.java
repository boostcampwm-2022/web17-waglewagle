package com.waglewagle.rest.thread.entity;

import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.thread.dto.ThreadDTO.CreateThreadDTO;
import com.waglewagle.rest.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Thread {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User author;

    @Column(length = 5000)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_thread_id")
    private Thread parentThread;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parentThread")
    private List<Thread> children = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    public Thread(CreateThreadDTO createThreadDTO) {
        author = createThreadDTO.getAuthor();
        parentThread = createThreadDTO.getParentThread();
        content = createThreadDTO.getContent();
        keyword = createThreadDTO.getKeyword();
    }
}
