package com.waglewagle.rest.thread;

import com.waglewagle.rest.keyword.Keyword;
import com.waglewagle.rest.keyword.KeywordRepository;
import com.waglewagle.rest.thread.ThreadDTO.*;
import com.waglewagle.rest.user.User;
import com.waglewagle.rest.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ThreadService {

    private final ThreadRepository threadRepository;
    private final UserRepository userRepository;
    private final KeywordRepository keywordRepository;

    @Transactional
    public Thread creatThread(Long userId, CreateThreadInputDTO createThreadInputDTO) {

        Optional<Thread> parentThread = Optional.empty();

        if (createThreadInputDTO.getParentThreadId() != null) {

            parentThread = threadRepository.findById(createThreadInputDTO.getParentThreadId());

            if (parentThread.isPresent()) {
                if (parentThread.get().getParentThread() != null) {
                    return null; //TODO: return null이 아닌 예외 등의 다른 처리
                }
            }
        }

        User author = userRepository.findById(userId);
        Keyword keyword = keywordRepository.findOne(createThreadInputDTO.getKeywordId());
        String content = createThreadInputDTO.getContent();

        //TODO: java Optional 문법!
        CreateThreadDTO createThreadDTO = parentThread.map(
                thread -> CreateThreadDTO.createCreateThreadDTO(author, thread, keyword, content))
                .orElseGet(() -> CreateThreadDTO.createCreateThreadDTO(author, null, keyword, content)
                );

        return threadRepository.save(new Thread(createThreadDTO));
    }

    @Transactional
    public void deleteThread(Long userId, Long threadId) {

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

    @Transactional
    public List<ThreadResponseDTO> getThreadsInKeyword(Long keywordId) {
        List<Thread> threads = threadRepository.findThreadsByParentThreadIsNullAndKeywordId(keywordId);
        return threads
                .stream()
                .map(ThreadResponseDTO::of)
                .collect(Collectors.toList());
    }
}
