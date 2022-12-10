package com.waglewagle.rest.keyword.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.waglewagle.rest.community.entity.QCommunity;
import com.waglewagle.rest.keyword.data_object.dto.request.KeywordRequest;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.entity.QKeyword;
import com.waglewagle.rest.keyword.entity.QKeywordUser;
import com.waglewagle.rest.keyword.repository.custom.KeywordCustomRepository;
import com.waglewagle.rest.user.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public interface KeywordRepository extends JpaRepository<Keyword, Long>, KeywordCustomRepository {
}