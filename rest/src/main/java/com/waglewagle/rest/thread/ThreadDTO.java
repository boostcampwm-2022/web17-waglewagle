package com.waglewagle.rest.thread;

import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.user.dto.AuthorDTO;
import com.waglewagle.rest.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ThreadDTO {

    @Getter
    public static class CreateThreadInputDTO {

        private Long keywordId;
        private Long parentThreadId;
        private String content;

        public void setContent(String content) {
            this.content = content;
        }

        public void setKeywordId(String keywordId) {
            this.keywordId = Long.parseLong(keywordId);
        }

        public void setParentThreadId(String parentThreadId) {
            this.parentThreadId = Long.parseLong(parentThreadId);
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class CreateThreadDTO {

        private User author;
        private Thread parentThread;
        private Keyword keyword;
        private String content;

        static CreateThreadDTO from(User author, Thread parentThread, Keyword keyword, String content) {
            CreateThreadDTO createThreadDTO = new CreateThreadDTO();
            createThreadDTO.setAuthor(author);
            createThreadDTO.setParentThread(parentThread);
            createThreadDTO.setKeyword(keyword);
            createThreadDTO.setContent(content);
            return createThreadDTO;

        }

    }


    @Getter
    public static class ThreadResponseDTO {

        private String threadId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private AuthorDTO author;
        private List<ThreadResponseDTO> childThreads = new ArrayList<>();
        private Integer childThreadCount = 0;

        public static ThreadResponseDTO of(Thread thread) {
            ThreadResponseDTO threadResponseDTO = new ThreadResponseDTO();
            threadResponseDTO.threadId = thread.getId().toString();
            threadResponseDTO.content = thread.getContent();
            threadResponseDTO.createdAt = thread.getCreatedAt();
            threadResponseDTO.updatedAt = thread.getUpdatedAt();
            threadResponseDTO.author = AuthorDTO.createAuthorDTO(thread.getAuthor());
            return threadResponseDTO;
        }
    }


    @Getter
    @NoArgsConstructor
    public static class DeleteThreadDTO {

        private Long threadId;

        public void setThreadId(String threadId) {
            this.threadId = Long.parseLong(threadId);
        }
    }
}
