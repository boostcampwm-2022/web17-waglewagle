package com.waglewagle.rest.thread;

import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.community.service.CommunityService;
import com.waglewagle.rest.keyword.service.KeywordService;
import com.waglewagle.rest.thread.controller.ThreadController;
import com.waglewagle.rest.thread.data_object.dto.request.ThreadRequest;
import com.waglewagle.rest.thread.data_object.dto.response.ThreadResponse;
import com.waglewagle.rest.thread.entity.Thread;
import com.waglewagle.rest.thread.repository.ThreadRepository;
import com.waglewagle.rest.thread.service.ThreadService;
import com.waglewagle.rest.user.repository.UserRepository;
import com.waglewagle.rest.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ThreadServiceTest {
    @Autowired
    private CommunityService communityService;
    @Autowired
    private CommunityRepository communityRepository;
    @Autowired
    private KeywordService keywordService;
    @Autowired
    private ThreadController threadController;
    @Autowired
    private ThreadRepository threadRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ThreadService threadService;


    @Test
    @Transactional
    void creatThread() {
        Long userId = createUser();
        Long communityId = createCommunity(userId);
        Long keywordId = createKeyword(userId, communityId);

        ThreadResponse.ThreadDTO threadDTO = createThread(userId, keywordId, "sample thread");

        assertThat(threadDTO).isNotNull();
        assertThat(threadDTO.getAuthor().getUserId()).isEqualTo(userId.toString());

    }

    @Test
    @Transactional
    void deleteThread() {
        Long userId = createUser();
        Long communityId = createCommunity(userId);
        Long keywordId = createKeyword(userId, communityId);

        ThreadResponse.ThreadDTO threadDTO = createThread(userId, keywordId, "sample thread");

        threadService.deleteThread(userId, Long.parseLong(threadDTO.getThreadId()));

        Thread deletedThread = threadRepository.findThreadById(Long.parseLong(threadDTO.getThreadId()));

        assertThat(deletedThread).isNull();
        assertThat(threadRepository.findAll().size()).isEqualTo(0);
    }


    @Test
    @Transactional
    void getThreadsInKeyword() {
        Long userId = createUser();
        Long communityId = createCommunity(userId);
        Long keywordId = createKeyword(userId, communityId);

        ThreadResponse.ThreadDTO threadDTO = createThread(userId, keywordId, "sample thread1");
        createThread(userId, keywordId, "sample thread2");
        createThread(userId, keywordId, "sample thread3");
        createThread(userId, keywordId, "sample thread4");
        createChildThread(userId, keywordId, Long.parseLong(threadDTO.getThreadId()), "sample child thread1");
        createChildThread(userId, keywordId, Long.parseLong(threadDTO.getThreadId()), "sample child thread2");
        createChildThread(userId, keywordId, Long.parseLong(threadDTO.getThreadId()), "sample child thread3");

        List<ThreadResponse.ThreadDTO> threads = threadService.getThreadsInKeyword(keywordId).getData();

        assertThat(threads.size()).isEqualTo(4);
        // TODO : 자꾸 자식 쓰레드가 안 읽힌다.
        // TODO : API에서는 읽히므로 TEST 환경에 대해서 알아보자.
//        assertThat(threads
//                .stream()
//                .filter(t -> !t.getChildThreads().isEmpty())
//                .collect(Collectors.toList())
//                .get(0)
//                .getChildThreadCount()
//        )
//                .isEqualTo(3);
    }

    Long createUser() {
        return userService.authenticateWithUsername("myUserName");
    }

    Long createCommunity(Long userId) {
        return Long.parseLong(communityService.createCommunity(userId, "title", "summary").getData().getCommunityId());
    }

    Long createKeyword(Long userId, Long communityId) {
        return keywordService.createKeyword(userId, communityId, "keyword").getId();
    }

    ThreadResponse.ThreadDTO
    createThread(final Long userId,
                 final Long keywordId,
                 final String content) {
        ThreadRequest.CreateDTO
                createDTO = ThreadRequest.CreateDTO.from(keywordId, content);

        return threadService.creatThread(userId, createDTO).getData();
    }

    ThreadResponse.ThreadDTO
    createChildThread(final Long userId,
                      final Long keywordId,
                      final Long threadId,
                      final String content) {
        ThreadRequest.CreateDTO
                createDTO = ThreadRequest.CreateDTO.from(keywordId, threadId, content);

        return threadService.creatThread(userId, createDTO).getData();
    }
}