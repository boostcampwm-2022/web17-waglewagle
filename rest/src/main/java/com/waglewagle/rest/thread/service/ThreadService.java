package com.waglewagle.rest.thread.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.repository.KeywordRepository;
import com.waglewagle.rest.thread.data_object.dto.ThreadDTO.CreateDTO;
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
    public PreResponseDTO<Thread> creatThread(final Long userId,
                                              final ThreadRequest.CreateThreadInputDTO createThreadInputDTO) throws IllegalArgumentException {

        User author = userRepository
                .findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        Keyword keyword = keywordRepository.findOne(createThreadInputDTO.getKeywordId());
        if (keyword == null)
            throw new IllegalArgumentException("존재하지 않는 키워드입니다.");
        String content = createThreadInputDTO.getContent();


        Long parentThreadId = createThreadInputDTO.getParentThreadId();

        if (parentThreadId == null) {
            CreateDTO createDTO = CreateDTO.from(author, null, keyword, content);
            return new PreResponseDTO<>(threadRepository.save(Thread.of(createDTO)), HttpStatus.CREATED);
        }

        Thread parentThread = threadRepository.findById(parentThreadId).orElse(null);
        if (parentThread == null || (parentThread != null && parentThread.getParentThread() != null)) {
            return new PreResponseDTO<>(null, HttpStatus.BAD_REQUEST);
        }

        CreateDTO createDTO = CreateDTO.from(author, parentThread, keyword, content);
        return new PreResponseDTO<>(threadRepository.save(Thread.of(createDTO)), HttpStatus.CREATED);

        //TODO: java Optional 문법!

    }

    @Transactional
    public void deleteThread(final Long userId, final Long threadId) {

        Optional<Thread> thread = threadRepository.findById(threadId);

        if (thread.isEmpty()) {
            return; //TODO: 예외 혹은 제대로된 리턴
        }

        if (!Objects.equals(thread.get().getAuthor().getId(), userId)) {
            return; //TODO: 예외 혹은 제대로된 리턴
        }

        threadRepository.deleteAllByParentThreadId(threadId); //TODO: 아직 동작 확인 못함(테스트코드)
        threadRepository.deleteById(threadId);
    }

    @Transactional(readOnly = true)
    public List<ThreadResponse.ThreadDTO> getThreadsInKeyword(final Long keywordId) {
        List<Thread> parentThreads = threadRepository.findParentThreadsInKeyword(keywordId);
        List<Thread> childThreads = threadRepository
                .findChildThreads(
                        parentThreads
                                .stream()
                                .map(t -> t.getId())
                                .collect(Collectors.toList()));


        return mapParentAndChildThreads(parentThreads, childThreads);
    }

    public List<ThreadResponse.ThreadDTO> mapParentAndChildThreads(final List<Thread> parentThreads,
                                                                   final List<Thread> childThreads) {

        HashMap<Long, List<ThreadResponse.ThreadDTO>> idToDTOs = new HashMap<>();
        childThreads.forEach(thread -> {
            if (!idToDTOs.containsKey(thread.getParentThread().getId())) {
                idToDTOs.put(thread.getParentThread().getId(), new ArrayList<>());
            }
            idToDTOs.get(thread.getParentThread().getId()).add(ThreadResponse.ThreadDTO.of(thread));
        });
        return parentThreads
                .stream()
                .map(thread -> {
                    ThreadResponse.ThreadDTO threadDTO = ThreadResponse.ThreadDTO.of(thread);
                    if (idToDTOs.containsKey(thread.getId()))
                        idToDTOs.get(thread.getId()).forEach(threadDTO::addChild);
                    return threadDTO;
                })
                .collect(Collectors.toList());
    }
}
