package com.waglewagle.rest.thread.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.repository.KeywordRepository;
import com.waglewagle.rest.thread.data_object.dto.ThreadDTO;
import com.waglewagle.rest.thread.data_object.dto.request.ThreadRequest;
import com.waglewagle.rest.thread.data_object.dto.response.ThreadResponse;
import com.waglewagle.rest.thread.entity.Thread;
import com.waglewagle.rest.thread.repository.ThreadRepository;
import com.waglewagle.rest.user.entity.User;
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
            IllegalArgumentException,
            NoSuchElementException {

        Long keywordId = Optional
                .ofNullable(createDTO.getKeywordId())
                .orElseThrow(() -> new IllegalArgumentException("키워드 아이디를 입력해야 합니다."));
        String content = Optional
                .ofNullable(createDTO.getContent())
                .orElseThrow(() -> new NoSuchElementException("쓰레드는 내용이 존재해야 합니다."));
        User author = userRepository
                .findById(userId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
        Keyword keyword = keywordRepository
                .findById(keywordId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 키워드입니다."));


        Long parentThreadId = createDTO.getParentThreadId();
        if (parentThreadId == null) {
            ThreadDTO.CreateDTO createDTO1 = ThreadDTO.CreateDTO.from(author, null, keyword, content);
            return new PreResponseDTO<>(
                    ThreadResponse.ThreadDTO.of(threadRepository.save(Thread.of(createDTO1))),
                    HttpStatus.CREATED);
        }

        Thread parentThread = threadRepository
                .findById(parentThreadId)
                .map(thread -> {
                    if (thread.getParentThread() == null)
                        throw new NoSuchElementException("부모 쓰레드가 존재하지 않습니다.");
                    return thread;
                }).map(thread -> {
                    if (thread.getParentThread().getParentThread() != null)
                        throw new IllegalArgumentException("대댓글은 허용되지 않습니다.");
                    return thread;
                }).filter(thread ->
                        Objects.equals(thread.getKeyword().getId(), createDTO.getKeywordId()))
                .orElseThrow(() ->
                        new NoSuchElementException("올바른 쓰레드가 아닙니다."));


        ThreadDTO.CreateDTO createDTO2 = ThreadDTO.CreateDTO.from(author, parentThread, keyword, content);
        return new PreResponseDTO<>(
                ThreadResponse.ThreadDTO.of(threadRepository.save(Thread.of(createDTO2))),
                HttpStatus.CREATED);

    }

    @Transactional
    public void
    deleteThread(final Long userId,
                 final Long threadId)
            throws
            IllegalArgumentException,
            NoSuchElementException {

        threadRepository
                .findById(threadId)
                .map((thread) -> {
                    if (thread.getAuthor().getId() != userId)
                        throw new IllegalArgumentException();
                    return thread;
                }).orElseThrow(() -> new NoSuchElementException("찾는 쓰레드가 존재하지 않습니다."));

        threadRepository.deleteAllByParentThreadId(threadId);
        threadRepository.deleteById(threadId);
    }

    @Transactional(readOnly = true)
    public PreResponseDTO<List<ThreadResponse.ThreadDTO>>
    getThreadsInKeyword(final Long keywordId) {
        List<Thread> parentThreads = threadRepository.findParentThreadsInKeyword(keywordId);
        List<Thread> childThreads = threadRepository
                .findChildThreads(
                        parentThreads
                                .stream()
                                .map(t -> t.getId())
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
