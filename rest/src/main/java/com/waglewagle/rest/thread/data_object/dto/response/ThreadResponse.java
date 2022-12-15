package com.waglewagle.rest.thread.data_object.dto.response;

import com.waglewagle.rest.thread.entity.Thread;
import com.waglewagle.rest.user.data_object.dto.response.UserResponse;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ThreadResponse {
    @Getter
    public static class ThreadDTO {

        private String threadId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private UserResponse.AuthorDTO author;
        private Integer childThreadCount = 0;
        private List<ThreadDTO> childThreads = new ArrayList<>();

        public static ThreadDTO of(Thread thread) {
            ThreadDTO threadDTO = new ThreadDTO();
            threadDTO.threadId = thread.getId().toString();
            threadDTO.content = thread.getContent();
            threadDTO.createdAt = thread.getCreatedAt();
            threadDTO.updatedAt = thread.getUpdatedAt();
            threadDTO.author = UserResponse.AuthorDTO.of(thread.getAuthor());
            return threadDTO;
        }

        public void addChild(ThreadDTO threadDTO) {
            childThreads.add(threadDTO);
            childThreadCount++;
        }
    }
}
