package com.waglewagle.rest.community.repository;

import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.repository.custom.CommunityCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long>, CommunityCustomRepository {
}
