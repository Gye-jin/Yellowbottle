package com.spring.back.dto;

import java.time.LocalDate;

import com.spring.back.entity.Comment;

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
	private boolean editor;
	private Long commentNo;
	private Long boardNo;
	private String userId;
	private String commentContent;
	private LocalDate commentDate;
	
	// comment객체 DTO에서 entity로 변경
	public static Comment commentDtoToEntity(CommentDTO commentDTO) {
		Comment comment = Comment.builder()
								 .commentNo(commentDTO.getCommentNo())
								 .commentContent(commentDTO.getCommentContent())
								 .commentDate(commentDTO.getCommentDate())
								 .build();
		return comment;
	}
	
	
	
}
