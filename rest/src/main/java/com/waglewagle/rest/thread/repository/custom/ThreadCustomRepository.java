package com.waglewagle.rest.thread.repository.custom;

import com.waglewagle.rest.thread.entity.Thread;

import java.util.List;

public interface ThreadCustomRepository {


    List<Thread> findParentThreadsInKeyword(Long keywordId);

    List<Thread> findChildThreads(List<Long> threadIds);
}
