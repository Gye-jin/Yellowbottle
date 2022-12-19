package com.spring.back.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.spring.back.dto.CommentDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Builder
@Table(name = "comment")
@EntityListeners(AuditingEntityListener.class)
public class Comment {
	// Column
	// --------------------------------------------------------------------------------------------------------------------------------
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentNo;
	
	private String commentContent;
	
	@LastModifiedDate
	private LocalDateTime commentDate;
	
	// Join
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Board Join]
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "board_no")
	private Board board;
	
	// [User Join]
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id")
	private User user;
	
	// Build
	// --------------------------------------------------------------------------------------------------------------------------------
	// DtoToEntity
	public static CommentDTO falseEntityToDTO(Comment comment) {
		CommentDTO commentDTO = CommentDTO.builder()
									  .editor(false)
									  .commentNo(comment.getCommentNo())
									  .userId(comment.getUser().getUserId())
									  .boardNo(comment.getBoard().getBoardNo())
									  .commentContent(comment.getCommentContent())
									  .commentDate(comment.getCommentDate())
									  .build();
		return commentDTO;
	}
	
	
	public static CommentDTO trueEntityToDTO(Comment comment) {
		CommentDTO commentDTO = CommentDTO.builder()
									  .editor(true)
									  .commentNo(comment.getCommentNo())
									  .userId(comment.getUser().getUserId())
									  .boardNo(comment.getBoard().getBoardNo())
									  .commentContent(comment.getCommentContent())
									  .commentDate(comment.getCommentDate())
									  .build();
		return commentDTO;
	}
	
	// Entity Element Update
	// --------------------------------------------------------------------------------------------------------------------------------
	
	// [Board 채워주기]
	public void boardInComment(Board board) {
		this.board = board;
	}
	
	// [User 채워주기]
	public void userInComment(User user) {
		this.user = user;
	}
	
	// [댓글 내용 수정하기]
	public void updateCommentContentInEntity(String commentContent) {
		this.commentContent = commentContent;
	}
}
