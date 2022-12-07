package com.spring.board.dto;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;

import com.spring.board.entity.Board;
import com.spring.board.entity.Comment;
import com.spring.board.entity.User;
import com.spring.board.repository.BoardRepository;
import com.spring.board.service.BoardService;
import com.spring.board.service.BoardServiceImpl;

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
	private Long boardNo;
	private String userId;
	private String commentContent;
	private String commentDate;
	
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
