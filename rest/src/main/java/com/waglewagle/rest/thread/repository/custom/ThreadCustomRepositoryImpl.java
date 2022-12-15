package com.waglewagle.rest.thread.repository.custom;

import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.thread.entity.QThread;
import com.waglewagle.rest.thread.entity.Thread;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ThreadCustomRepositoryImpl implements ThreadCustomRepository {

    private final JPQLQueryFactory jpqlQueryFactory;

    public List<Thread>
    findParentThreadsInKeyword(Long keywordId) {
        return jpqlQueryFactory
                .selectFrom(QThread.thread)
                .leftJoin(QThread.thread.author)
                .fetchJoin()
                .where(QThread.thread.parentThread.isNull())
                .where(QThread.thread.keyword.id.eq(keywordId))
                .orderBy(QThread.thread.id.asc())
                .fetch();

    }

    public List<Thread>
    findChildThreads(List<Long> threadIds) {
        return jpqlQueryFactory
                .selectFrom(QThread.thread)
                .leftJoin(QThread.thread.author)
                .fetchJoin()
                .leftJoin(QThread.thread.parentThread)
                .fetchJoin()
                .where(QThread.thread.parentThread.id.in(threadIds))
                .orderBy(QThread.thread.id.asc())
                .fetch();
    }
}
