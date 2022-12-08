package com.waglewagle.rest.thread;

import java.util.List;

public interface CustomThreadRepository {


    List<Thread> findParentThreadsInKeyword(Long keywordId);
    List<Thread> findChildThreads(List<Long> threadIds);
}
