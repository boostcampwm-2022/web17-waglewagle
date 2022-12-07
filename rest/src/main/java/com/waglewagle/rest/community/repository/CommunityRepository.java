package com.waglewagle.rest.community.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.community.Community;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;


import static com.waglewagle.rest.communityUser.QCommunityUser.communityUser;

public interface CommunityRepository extends JpaRepository<Community, Long>, CommunityCustomRepository {
}
