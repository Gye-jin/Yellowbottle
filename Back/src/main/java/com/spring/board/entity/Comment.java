package com.spring.board.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.spring.board.dto.CommentDTO;

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
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentNo;
	
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id")
	private User user;
	
	// board와 join, optional=false로 null값 허용
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "board_no")
	private Board board;

	private String commentContent;
	private String commentDate;
	
	// comment entity객체 DTO로 변경하기
	public static CommentDTO commentEntityToDTO(Comment comment) {
		CommentDTO commentDTO = CommentDTO.builder()
									  .commentNo(comment.getCommentNo())
									  .userId(comment.getUser().getUserId())
									  .boardNo(comment.getBoard().getBoardNo())
									  .commentContent(comment.getCommentContent())
									  .commentDate(comment.getCommentDate())
									  .build();
		return commentDTO;
	}
	
	public void boardInComment(Board board) {
		this.board = board;
	}

	public void userInComment(User user) {
		this.user = user;
	}
}
