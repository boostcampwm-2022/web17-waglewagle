package com.waglewagle.rest.thread.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.common.exception.InvalidInputException;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.exception.NoSuchKeywordException;
import com.waglewagle.rest.keyword.repository.KeywordRepository;
import com.waglewagle.rest.thread.data_object.dto.ThreadVO;
import com.waglewagle.rest.thread.data_object.dto.request.ThreadRequest;
import com.waglewagle.rest.thread.data_object.dto.response.ThreadResponse;
import com.waglewagle.rest.thread.entity.Thread;
import com.waglewagle.rest.thread.repository.ThreadRepository;
import com.waglewagle.rest.user.data_object.dto.response.UserResponse;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.enums.Role;
import com.waglewagle.rest.user.exception.NoSuchUserException;
import com.waglewagle.rest.user.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


class ThreadServiceTest {

    private User admin;
    private User user1;
    private Community community1;
    private Keyword keyword1;
    private Keyword keyword2;
    private CommunityUser communityUser1;
    private CommunityUser communityUser2;

    @Mock
    private UserRepository userRepository;
    @Mock
    private KeywordRepository keywordRepository;
    @Mock
    private ThreadRepository threadRepository;
    @InjectMocks
    private ThreadService threadService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        keywordRepository = mock(KeywordRepository.class);
        threadRepository = mock(ThreadRepository.class);
        threadService = new ThreadService(threadRepository, userRepository, keywordRepository);

        admin = mock(User.class);
        Mockito.when(admin.getId()).thenReturn(1L);
        Mockito.when(admin.getUsername()).thenReturn("admin username");
        Mockito.when(admin.getEmail()).thenReturn("mockEMail1@example.com");
        Mockito.when(admin.getRole()).thenReturn(Role.ADMIN);
        Mockito.when(userRepository.findById(admin.getId())).thenReturn(Optional.of(admin));

        user1 = mock(User.class);
        Mockito.when(user1.getId()).thenReturn(2L);
        Mockito.when(user1.getUsername()).thenReturn("user username");
        Mockito.when(user1.getEmail()).thenReturn("mockEMailw@example.com");
        Mockito.when(user1.getProfileImageUrl()).thenReturn("https://loremflickr.com/640/480/abstract");
        Mockito.when(user1.getRole()).thenReturn(Role.USER);
        Mockito.when(userRepository.findById(user1.getId())).thenReturn(Optional.of(user1));

        community1 = mock(Community.class);
        Mockito.when(community1.getId()).thenReturn(1L);
        Mockito.when(community1.getAdmin()).thenReturn(admin);
        Mockito.when(community1.getTitle()).thenReturn("mock title");
        Mockito.when(community1.getSummary()).thenReturn("mock summary");

        communityUser1 = mock(CommunityUser.class);
        Mockito.when(communityUser1.getId()).thenReturn(1L);
        Mockito.when(communityUser1.getCommunity()).thenReturn(community1);
        Mockito.when(communityUser1.getUser()).thenReturn(admin);
        Mockito.when(communityUser1.getIsFirstVisit()).thenReturn(false);

        communityUser2 = mock(CommunityUser.class);
        Mockito.when(communityUser2.getId()).thenReturn(2L);
        Mockito.when(communityUser2.getCommunity()).thenReturn(community1);
        Mockito.when(communityUser2.getUser()).thenReturn(user1);
        Mockito.when(communityUser2.getIsFirstVisit()).thenReturn(false);

        keyword1 = mock(Keyword.class);
        Mockito.when(keyword1.getId()).thenReturn(1L);
        Mockito.when(keyword1.getKeyword()).thenReturn("test keyword1");
        Mockito.when(keyword1.getAuthor()).thenReturn(admin);
        Mockito.when(keyword1.getCommunity()).thenReturn(community1);
        Mockito.when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        Mockito.when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keyword2 = mock(Keyword.class);
        Mockito.when(keyword1.getId()).thenReturn(2L);
        Mockito.when(keyword1.getKeyword()).thenReturn("test keyword2");
        Mockito.when(keyword1.getAuthor()).thenReturn(user1);
        Mockito.when(keyword1.getCommunity()).thenReturn(community1);
        Mockito.when(keywordRepository.save(keyword2)).thenReturn(keyword2);
        Mockito.when(keywordRepository.findById(2L)).thenReturn(Optional.ofNullable(keyword2));

        Mockito.when(keywordRepository.findById(3L)).thenReturn(Optional.empty());
        Mockito.when(userRepository.findById(3L)).thenReturn(Optional.empty());
    }


    @Test
    @DisplayName("스레드 생성 테스트 #1")
    void creatThread1() {
        // given
        // user1 이 thread를 생성함.
        String testThreadContent = "Thread Content";
        ThreadVO.CreateVO createVO1 = ThreadVO.CreateVO.from(user1, null, keyword1, testThreadContent);
        Thread savedThread = Thread
                .builder()
                .id(1L)
                .author(user1)
                .parentThread(null)
                .keyword(keyword1)
                .content(testThreadContent)
                .build();

        Mockito.when(threadRepository.save(any(Thread.class))).thenReturn(savedThread);


        // when
        // threadService의 createThread 메서드 실행
        PreResponseDTO<ThreadResponse.ThreadDTO>
                preResponseDTO = threadService.creatThread(user1.getId(), ThreadRequest.CreateDTO.from(keyword1.getId(), testThreadContent));
        ThreadResponse.ThreadDTO threadDTO = preResponseDTO.getData();
        HttpStatus httpStatus = preResponseDTO.getHttpStatus();

        // then
        // 저장된 것이 임의로 만든 값과 같음
        assertThat(threadDTO.getThreadId()).isEqualTo("1");
        assertThat(threadDTO.getChildThreadCount()).isEqualTo(0);
        assertThat(threadDTO.getAuthor()).usingRecursiveComparison().isEqualTo(UserResponse.AuthorDTO.of(user1));
        assertThat(threadDTO.getAuthor()).usingRecursiveComparison().isEqualTo(UserResponse.AuthorDTO.of(user1));
        assertThat(threadDTO.getContent()).isEqualTo(testThreadContent);
        assertThat(HttpStatus.CREATED.equals(httpStatus)).isTrue();

    }

    @Test
    @DisplayName("스레드 생성 테스트 #2")
    void creatThread2() {
        String testThreadContent = "Thread Content";
        Thread savedThread = Thread
                .builder()
                .id(1L)
                .author(user1)
                .parentThread(null)
                .keyword(keyword1)
                .content(testThreadContent)
                .build();
        Mockito.when(threadRepository.save(any(Thread.class))).thenReturn(savedThread);

        Assertions.assertThrows(NoSuchKeywordException.class, () -> {
            threadService.creatThread(user1.getId(), ThreadRequest.CreateDTO.from(3L, testThreadContent));
        });
        Assertions.assertThrows(NoSuchUserException.class, () -> {
            threadService.creatThread(3L, ThreadRequest.CreateDTO.from(keyword1.getId(), testThreadContent));
        });
        Assertions.assertThrows(InvalidInputException.class, () -> {
            threadService.creatThread(1L, ThreadRequest.CreateDTO.from(keyword1.getId(), null));
        });
        Assertions.assertThrows(InvalidInputException.class, () -> {
            threadService.creatThread(1L, ThreadRequest.CreateDTO.from(null, testThreadContent));
        });


    }

    @Test
    void deleteThread() {

    }

    @Test
    @DisplayName("키워드 속 쓰레드 찾기 #1")
    void getThreadsInKeyword1() {
        String testParentContent = "test parent content";
        String testChildContent = "test child content";
        Thread parentThread = mock(Thread.class);
        Thread childThread = mock(Thread.class);

        when(parentThread.getId()).thenReturn(1L);
        when(parentThread.getContent()).thenReturn(testParentContent);
        when(parentThread.getAuthor()).thenReturn(user1);
        when(parentThread.getKeyword()).thenReturn(keyword1);
        when(parentThread.getChildren()).thenReturn(Stream.of(childThread).collect(Collectors.toList()));
        when(childThread.getId()).thenReturn(2L);
        when(childThread.getContent()).thenReturn(testChildContent);
        when(childThread.getAuthor()).thenReturn(admin);
        when(childThread.getKeyword()).thenReturn(keyword1);
        when(childThread.getParentThread()).thenReturn(parentThread);
        when(childThread.getChildren()).thenReturn(new ArrayList<>());

        when(threadRepository
                .findParentThreadsInKeyword(keyword1.getId()))
                .thenReturn(Stream.of(parentThread).collect(Collectors.toList()));
        when(threadRepository
                .findChildThreads(
                        Stream
                                .of(parentThread)
                                .map(Thread::getId)
                                .collect(Collectors.toList()))
        ).thenReturn(
                Stream
                        .of(childThread)
                        .collect(Collectors.toList()));

        PreResponseDTO<List<ThreadResponse.ThreadDTO>>
                preResponseDTO = threadService.getThreadsInKeyword(keyword1.getId());
        List<ThreadResponse.ThreadDTO> threadDTOS = preResponseDTO.getData();
        ThreadResponse.ThreadDTO parentThreadDTO = threadDTOS.get(0);
        ThreadResponse.ThreadDTO childThreadDTO = parentThreadDTO.getChildThreads().get(0);

        assertThat(threadDTOS.size()).isEqualTo(1);

        assertThat(parentThreadDTO.getThreadId()).isEqualTo("1");
        assertThat(parentThreadDTO.getAuthor()).usingRecursiveComparison().isEqualTo(UserResponse.AuthorDTO.of(user1));
        assertThat(parentThreadDTO.getChildThreadCount()).isEqualTo(1);
        assertThat(parentThreadDTO.getContent()).isEqualTo(testParentContent);
        assertThat(parentThreadDTO.getChildThreads().size()).isEqualTo(1);

        assertThat(childThreadDTO.getThreadId()).isEqualTo("2");
        assertThat(childThreadDTO.getAuthor()).usingRecursiveComparison().isEqualTo(UserResponse.AuthorDTO.of(admin));
        assertThat(childThreadDTO.getChildThreadCount()).isEqualTo(0);
        assertThat(childThreadDTO.getContent()).isEqualTo(testChildContent);
        assertThat(childThreadDTO.getChildThreads().size()).isEqualTo(0);

    }

    @Test
    @DisplayName("키워드 속 쓰레드 찾기 #2")
    void getThreadsInKeyword2() {
        String testParentContent = "test parent content";
        String testChildContent = "test child content";
        Keyword unusedKeyword = mock(Keyword.class);
        Thread parentThread = mock(Thread.class);
        Thread childThread = mock(Thread.class);


        when(unusedKeyword.getId()).thenReturn(3L);
        when(parentThread.getId()).thenReturn(1L);
        when(parentThread.getContent()).thenReturn(testParentContent);
        when(parentThread.getAuthor()).thenReturn(user1);
        when(parentThread.getKeyword()).thenReturn(keyword1);
        when(parentThread.getChildren()).thenReturn(Stream.of(childThread).collect(Collectors.toList()));
        when(childThread.getId()).thenReturn(2L);
        when(childThread.getContent()).thenReturn(testChildContent);
        when(childThread.getAuthor()).thenReturn(admin);
        when(childThread.getKeyword()).thenReturn(keyword1);
        when(childThread.getParentThread()).thenReturn(parentThread);
        when(childThread.getChildren()).thenReturn(new ArrayList<>());


        Assertions.assertThrows(NoSuchKeywordException.class, () -> {
            threadService.getThreadsInKeyword(unusedKeyword.getId());
        });
    }


    @Test
    @DisplayName("parentThread와 childThreads 매핑하기")
    void mapParentAndChildThreads() {
        String testParentContent = "test parent content";
        String testChildContent = "test child content";
        Thread parentThread = mock(Thread.class);
        Thread childThread1 = mock(Thread.class);
        Thread childThread2 = mock(Thread.class);

        when(parentThread.getId()).thenReturn(1L);
        when(parentThread.getContent()).thenReturn(testParentContent);
        when(parentThread.getAuthor()).thenReturn(user1);
        when(parentThread.getKeyword()).thenReturn(keyword1);
        when(parentThread.getChildren()).thenReturn(Stream.of(childThread1).collect(Collectors.toList()));
        when(childThread1.getId()).thenReturn(2L);
        when(childThread1.getContent()).thenReturn(testChildContent);
        when(childThread1.getAuthor()).thenReturn(admin);
        when(childThread1.getKeyword()).thenReturn(keyword1);
        when(childThread1.getParentThread()).thenReturn(parentThread);
        when(childThread1.getChildren()).thenReturn(new ArrayList<>());
        when(childThread2.getId()).thenReturn(3L);
        when(childThread2.getContent()).thenReturn(testChildContent);
        when(childThread2.getAuthor()).thenReturn(user1);
        when(childThread2.getKeyword()).thenReturn(keyword1);
        when(childThread2.getParentThread()).thenReturn(parentThread);
        when(childThread2.getChildren()).thenReturn(new ArrayList<>());

        List<ThreadResponse.ThreadDTO> threadDTOS = threadService
                .mapParentAndChildThreads(
                        Stream
                                .of(parentThread)
                                .collect(Collectors.toList()),
                        Stream
                                .of(childThread1, childThread2)
                                .collect(Collectors.toList()));

        ThreadResponse.ThreadDTO threadDTO = threadDTOS.get(0);
        assertThat(threadDTOS.size()).isEqualTo(1);
        assertThat(threadDTO.getChildThreads().size()).isEqualTo(2);
        assertThat(threadDTO.getChildThreads().get(0)).usingRecursiveComparison()
                .isEqualTo(ThreadResponse.ThreadDTO.of(childThread1));
        assertThat(threadDTO.getChildThreads().get(1)).usingRecursiveComparison()
                .isEqualTo(ThreadResponse.ThreadDTO.of(childThread2));
    }
}