package com.waglewagle.rest.thread.controller;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.keyword.service.KeywordService;
import com.waglewagle.rest.thread.data_object.dto.request.ThreadRequest;
import com.waglewagle.rest.thread.data_object.dto.response.ThreadResponse;
import com.waglewagle.rest.thread.service.ThreadService;
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
    private final KeywordService keywordService;

    /**
     * Thread 생성
     * 11.30
     */
    @PostMapping("")
    @ResponseBody
    public ResponseEntity<ThreadResponse.ThreadDTO>
    createThread(@CookieValue("user_id") final Long userId,
                 @RequestBody final ThreadRequest.CreateDTO createDTO) {
        if (!createDTO.isValid())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        PreResponseDTO<ThreadResponse.ThreadDTO>
                preResponseDTO = threadService.creatThread(userId, createDTO);

        return new ResponseEntity<>(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus());

    }

    /**
     * Thread 삭제
     * 11.30
     */
    @DeleteMapping("")
    @ResponseBody
    public ResponseEntity<Boolean>
    deleteThread(@CookieValue("user_id") final Long userId,
                 @RequestBody final ThreadRequest.DeleteDTO deleteDTO) {

        threadService.deleteThread(userId, deleteDTO.getThreadId());
        return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
    }

    /**
     * Community Thread 읽기
     * 유저 정보를 함께 줘야한다.
     * Thread {
     * threadId: string
     * content: string
     * user {
     * userId: string
     * username: string
     * profileImageUrl: string
     * }
     * childThreads: Thread[]
     * created_at: Date(?)
     * updated_at: Date(?)
     * }
     */
    @GetMapping("/keyword")
    public ResponseEntity<List<ThreadResponse.ThreadDTO>>
    getThreadsInKeyword(@RequestParam("keyword-id") final Long keywordId) {

        PreResponseDTO<List<ThreadResponse.ThreadDTO>>
                preResponseDTO = threadService.getThreadsInKeyword(keywordId);


        return new ResponseEntity(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus());
    }
}
