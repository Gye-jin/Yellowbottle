package com.spring.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.board.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
