package com.waglewagle.rest.communityUser.repository;


import com.waglewagle.rest.communityUser.CommunityUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CommunityUserRepository extends JpaRepository<CommunityUser, Long>, CommunityUserCustomRepository {
}
