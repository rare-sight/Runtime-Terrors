package com.Wikeels.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Wikeels.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
