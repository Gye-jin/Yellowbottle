package com.spring.board.dto;

import com.spring.board.entity.Board;
import com.spring.board.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CommentDTO {
	private Long commentNo;
	private Board board;
	private String commentContent;
	private String commentDate;
	
	//
	public static Comment commentDtoToEntity(CommentDTO commentDTO) {
		Comment comment = Comment.builder()
								 .commentNo(commentDTO.getCommentNo())
								 .commentContent(commentDTO.getCommentContent())
								 .commentDate(commentDTO.getCommentDate())
								 .build();
		return comment;
	}
}
