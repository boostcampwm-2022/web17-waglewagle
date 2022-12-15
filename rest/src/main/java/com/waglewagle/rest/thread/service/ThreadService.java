package com.waglewagle.rest.thread.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.common.exception.InvalidInputException;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.exception.NoSuchKeywordException;
import com.waglewagle.rest.keyword.repository.KeywordRepository;
import com.waglewagle.rest.thread.data_object.dto.ThreadVO;
import com.waglewagle.rest.thread.data_object.dto.request.ThreadRequest;
import com.waglewagle.rest.thread.data_object.dto.response.ThreadResponse;
import com.waglewagle.rest.thread.entity.Thread;
import com.waglewagle.rest.thread.exception.InvalidThreadException;
import com.waglewagle.rest.thread.exception.NoSuchThreadException;
import com.waglewagle.rest.thread.repository.ThreadRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.exception.NoSuchUserException;
import com.waglewagle.rest.user.exception.UnauthorizedException;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ThreadService {

    private final ThreadRepository threadRepository;
    private final UserRepository userRepository;
    private final KeywordRepository keywordRepository;

    @Transactional
    public PreResponseDTO<ThreadResponse.ThreadDTO>
    creatThread(final Long userId,
                final ThreadRequest.CreateDTO createDTO)
            throws
            InvalidInputException,
            InvalidThreadException,
            NoSuchUserException,
            NoSuchKeywordException,
            NoSuchThreadException {

        Long keywordId = Optional
                .ofNullable(createDTO.getKeywordId())
                .orElseThrow(InvalidInputException::new);
        String content = Optional
                .ofNullable(createDTO.getContent())
                .orElseThrow(InvalidInputException::new);
        User author = userRepository
                .findById(userId)
                .orElseThrow(NoSuchUserException::new);
        Keyword keyword = keywordRepository
                .findById(keywordId)
                .orElseThrow(NoSuchKeywordException::new);


        Long parentThreadId = createDTO.getParentThreadId();
        if (parentThreadId == null) {
            ThreadVO.CreateVO createVO1 = ThreadVO.CreateVO.from(author, null, keyword, content);
            return new PreResponseDTO<>(
                    ThreadResponse.ThreadDTO.of(threadRepository.save(Thread.of(createVO1))),
                    HttpStatus.CREATED);
        }

        Thread parentThread = threadRepository
                .findById(parentThreadId)
                .map(pThread -> {
                    if (pThread == null)
                        throw new NoSuchThreadException();
                    return pThread;
                }).filter(pThread ->
                        pThread.getParentThread() == null
                ).filter(pThread ->
                        Objects.equals(pThread.getKeyword().getId(), createDTO.getKeywordId()))
                .orElseThrow(InvalidThreadException::new);


        ThreadVO.CreateVO createVO2 = ThreadVO.CreateVO.from(author, parentThread, keyword, content);
        return new PreResponseDTO<>(
                ThreadResponse.ThreadDTO.of(threadRepository.save(Thread.of(createVO2))),
                HttpStatus.CREATED);

    }

    @Transactional
    public void
    deleteThread(final Long userId,
                 final Long threadId)
            throws
            UnauthorizedException,
            NoSuchThreadException {

        threadRepository
                .findById(threadId)
                .map((thread) -> {
                    if (thread.getAuthor().getId() != userId)
                        throw new UnauthorizedException();
                    return thread;
                }).orElseThrow(NoSuchThreadException::new);

        threadRepository.deleteAllByParentThreadId(threadId);
        threadRepository.deleteById(threadId);
    }

    @Transactional(readOnly = true)
    public PreResponseDTO<List<ThreadResponse.ThreadDTO>>
    getThreadsInKeyword(final Long keywordId) {

        keywordRepository
                .findById(keywordId)
                .orElseThrow(NoSuchKeywordException::new);

        List<Thread> parentThreads = threadRepository.findParentThreadsInKeyword(keywordId);
        List<Thread> childThreads = threadRepository
                .findChildThreads(
                        parentThreads
                                .stream()
                                .map(Thread::getId)
                                .collect(Collectors.toList()));

        List<ThreadResponse.ThreadDTO>
                threadDTOS = mapParentAndChildThreads(parentThreads, childThreads);

        return new PreResponseDTO<>(
                threadDTOS,
                threadDTOS.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK
        );
    }

    public List<ThreadResponse.ThreadDTO>
    mapParentAndChildThreads(final List<Thread> parentThreads,
                             final List<Thread> childThreads) {

        HashMap<Long, List<ThreadResponse.ThreadDTO>>
                parentIdToChild = new HashMap<>();
        childThreads.forEach(thread -> {
            if (!parentIdToChild.containsKey(thread.getParentThread().getId())) {
                parentIdToChild.put(thread.getParentThread().getId(), new ArrayList<>());
            }
            parentIdToChild.get(thread.getParentThread().getId()).add(ThreadResponse.ThreadDTO.of(thread));
        });
        return parentThreads
                .stream()
                .map(thread -> {
                    ThreadResponse.ThreadDTO threadDTO = ThreadResponse.ThreadDTO.of(thread);
                    if (parentIdToChild.containsKey(thread.getId()))
                        parentIdToChild.get(thread.getId()).forEach(threadDTO::addChild);
                    return threadDTO;
                })
                .collect(Collectors.toList());
    }
}
