package com.waglewagle.rest.community.repository;


import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.community.repository.custom.CommunityUserCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CommunityUserRepository extends JpaRepository<CommunityUser, Long>, CommunityUserCustomRepository {
}
