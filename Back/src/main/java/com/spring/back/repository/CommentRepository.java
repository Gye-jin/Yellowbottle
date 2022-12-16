package com.spring.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.back.entity.Board;
import com.spring.back.entity.Comment;
import com.spring.back.entity.User;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	// boardNo에 해당하는 모든 댓글 삭제
	@Modifying
	@Query("DELETE FROM Comment c WHERE c.board.boardNo = :no")
	void deleteByboardNo(@Param("no") Long boardNo);
	
	// 해당 user의 댓글 수 반환
	Long countByUser(User user);
	
	Long countByBoard(Board board);
	
	public void deleteByUser(User user);
}
