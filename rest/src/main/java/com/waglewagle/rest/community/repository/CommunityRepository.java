package com.waglewagle.rest.community.repository;

import com.waglewagle.rest.community.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long>, CommunityCustomRepository {
}
