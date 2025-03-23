package com.Wikeels.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Wikeels.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
