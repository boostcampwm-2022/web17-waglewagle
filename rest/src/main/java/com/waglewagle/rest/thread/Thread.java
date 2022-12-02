package com.waglewagle.rest.thread;

import com.waglewagle.rest.keyword.Keyword;
import com.waglewagle.rest.thread.ThreadDTO.*;
import com.waglewagle.rest.user.User;
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
    private Thread parentThread;

    @OneToMany(mappedBy = "id")
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
