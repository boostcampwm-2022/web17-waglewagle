package com.waglewagle.rest.thread;


import com.waglewagle.rest.thread.ThreadDTO.*;
import lombok.RequiredArgsConstructor;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.waglewagle.rest.keyword.QKeyword.keyword1;
import static com.waglewagle.rest.thread.QThread.thread;
import static  com.waglewagle.rest.communityUser.QCommunityUser.communityUser;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Long> {

    void deleteAllByParentThreadId(Long parentThreadId);

    @Override
    void deleteById(Long id);

    //    public Thread createThread(CreateThreadDTO createThreadDTO) {
//
//        Thread thread = new Thread(createThreadDTO);
//
//        em.persist(thread);
//        return thread;
//    }

//    public Thread findById(Long threadId) {
//        return em.find(Thread.class, threadId);
//    }

//    public List<Thread> findChildren(Long threadId) {
//
//        return em.createQuery("SELECT t2 FROM Thread t LEFT JOIN Thread t2 ON t2.parentThread.id = :threadId", Thread.class)
//                .setParameter("threadId", threadId)
//                .getResultList();
//    }

//    public void deleteThread(Thread thread) {
//
//        List<Thread> childThreads = findChildren(thread.getId());
//
//        //TODO: 하나씩 delete할 필요없이(이것도 N+1같음) "DELETE thread WHERE thread.parentId == ?" 쿼리문 하나로 처리될 수 있는 거 아닌가?
//        for (Thread childThread: childThreads) {
//            deleteThread(childThread);
//        }
//
//        em.createQuery("DELETE FROM Thread t WHERE t.id = :threadId", Thread.class)
//                .setParameter("threadId", thread.getId())
//                .executeUpdate();
//    }
}
