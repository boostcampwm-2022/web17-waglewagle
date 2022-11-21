package com.waglewagle.rest.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class DemoRepository {

    private final EntityManager em;

    public List<Mock> findAll() {
        return em.createQuery("select m from Mock m", Mock.class)
                .getResultList();
    }
}
