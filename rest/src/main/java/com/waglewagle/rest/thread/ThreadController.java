package com.waglewagle.rest.thread;

import com.waglewagle.rest.thread.ThreadDTO.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/thread")
@RequiredArgsConstructor
public class ThreadController {

    private final ThreadService threadService;

    /**
     * Thread 생성
     * 11.30
     */
    @PostMapping("")
    @ResponseBody
    public ResponseEntity<Boolean> createThread(@CookieValue("user_id") Long userId, @RequestBody CreateThreadInputDTO createThreadInputDTO) {

        Thread thread = threadService.creatThread(userId, createThreadInputDTO);

        return new ResponseEntity<>(true, HttpStatus.CREATED);
    }

    /**
     * Thread 삭제
     * 11.30
     */
    @DeleteMapping("")
    @ResponseBody
    public ResponseEntity<Boolean> deleteThread(@CookieValue("user_id") Long userId, @RequestBody DeleteThreadDTO deleteThreadDTO) {

        threadService.deleteThread(userId, deleteThreadDTO.getThreadId());

        return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
    }

    /**
     * Community Thread 읽기
     * 유저 정보를 함께 줘야한다.
     * Thread {
     *   threadId: string
     *   content: string
     *   user {
     *     userId: string
     *     username: string
     *     profileImageUrl: string
     *   }
     *   childThreads: Thread[]
     *   created_at: Date(?)
     *   updated_at: Date(?)
     * }
     */
}
