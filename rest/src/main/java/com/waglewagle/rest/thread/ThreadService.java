package com.waglewagle.rest.thread;

import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.repository.KeywordRepository;
import com.waglewagle.rest.thread.data_object.dto.ThreadDTO.CreateThreadDTO;
import com.waglewagle.rest.thread.data_object.dto.ThreadDTO.CreateThreadInputDTO;
import com.waglewagle.rest.thread.data_object.dto.ThreadDTO.ThreadResponseDTO;
import com.waglewagle.rest.thread.entity.Thread;
import com.waglewagle.rest.thread.repository.ThreadRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.waglewagle.rest.thread.data_object.dto.ThreadDTO.CreateThreadDTO.from;

@Service
@RequiredArgsConstructor
public class ThreadService {

    private final ThreadRepository threadRepository;
    private final UserRepository userRepository;
    private final KeywordRepository keywordRepository;

    @Transactional
    public Thread creatThread(Long userId, CreateThreadInputDTO createThreadInputDTO) throws IllegalArgumentException {

        Long parentThreadId = createThreadInputDTO.getParentThreadId();
        Thread parentThread = null;
        if (parentThreadId != null && threadRepository.findById(parentThreadId).filter(pt -> pt.getParentThread() != null).isPresent()) {
            // 자식의 자식임.
            // 안 만들어 줘야 한다.
            return null;
        }
        if (parentThreadId != null && threadRepository.findById(parentThreadId).filter(pt -> pt.getParentThread() == null).isPresent()) {
            parentThread = threadRepository.findById(parentThreadId).filter(pt -> pt.getParentThread() == null).get();
        }

        User author = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        Keyword keyword = keywordRepository.findOne(createThreadInputDTO.getKeywordId());
        String content = createThreadInputDTO.getContent();

        //TODO: java Optional 문법!
        CreateThreadDTO createThreadDTO = from(author, parentThread, keyword, content);

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

    @Transactional(readOnly = true)
    public List<ThreadResponseDTO> getThreadsInKeyword(Long keywordId) {
        List<Thread> parentThreads = threadRepository.findParentThreadsInKeyword(keywordId);
        List<Thread> childThreads = threadRepository
                .findChildThreads(
                        parentThreads
                                .stream()
                                .map(t -> t.getId())
                                .collect(Collectors.toList()));
        HashMap<Long, ThreadResponseDTO> idToDTO = new HashMap<>();
        parentThreads.forEach(thread -> {
            idToDTO.put(thread.getId(), ThreadResponseDTO.of(thread));
        });
        childThreads.forEach(thread -> {
            idToDTO
                    .get(thread.getParentThread().getId())
                    .getChildThreads()
                    .add(ThreadResponseDTO.of(thread));
        });

        List<ThreadResponseDTO> threadResponseDTOS = idToDTO.values().stream().collect(Collectors.toList());
        ;

        threadResponseDTOS.sort(Comparator.comparingLong(dto -> Long.parseLong(dto.getThreadId())));

        return threadResponseDTOS;
    }
}
