package com.waglewagle.rest.thread.entity;

import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.thread.data_object.dto.ThreadVO;
import com.waglewagle.rest.user.entity.User;
import lombok.Builder;
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

    @Builder
    public Thread(Long id, User author, Thread parentThread, Keyword keyword, String content) {
        this.id = id;
        this.author = author;
        this.parentThread = parentThread;
        this.keyword = keyword;
        this.content = content;
    }

    public static Thread of(ThreadVO.CreateVO createVO) {
        Thread thread = new Thread();
        thread.author = createVO.getAuthor();
        thread.parentThread = createVO.getParentThread();
        thread.content = createVO.getContent();
        thread.keyword = createVO.getKeyword();
        return thread;
    }
}
