package com.spring.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.board.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
