package com.waglewagle.rest.user.repository;

import com.waglewagle.rest.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserCustomRepository {

    Optional<User> findByUsername(String username);
}