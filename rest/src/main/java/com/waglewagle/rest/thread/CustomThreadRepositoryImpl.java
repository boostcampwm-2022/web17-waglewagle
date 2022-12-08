package com.waglewagle.rest.thread;

import com.querydsl.jpa.JPQLQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CustomThreadRepositoryImpl implements CustomThreadRepository{

    private final JPQLQueryFactory jpqlQueryFactory;

    public List<Thread> findParentThreadsInKeyword(Long keywordId) {
        return jpqlQueryFactory
                .selectFrom(QThread.thread)
                .leftJoin(QThread.thread.author)
                .fetchJoin()
                .where(QThread.thread.parentThread.isNull())
                .where(QThread.thread.keyword.id.eq(keywordId))
                .fetch();

    }

    public List<Thread> findChildThreads(List<Long> threadIds) {
        return jpqlQueryFactory
                .selectFrom(QThread.thread)
                .leftJoin(QThread.thread.author)
                .fetchJoin()
                .leftJoin(QThread.thread.parentThread)
                .fetchJoin()
                .where(QThread.thread.parentThread.id.in(threadIds))
                .fetch();
    }
}
