package com.Wikeels.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Wikeels.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
