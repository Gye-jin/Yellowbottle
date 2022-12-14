package com.spring.back.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.back.entity.Board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardDTO {
	// Column
	// --------------------------------------------------------------------------------------------------------------------------------
	private boolean editor;
	private Long boardNo;
	private String userId;
	private String boardContent;
	private Long likeCount;
	private LocalDateTime createDate;
	private LocalDateTime modifiedDate;	
	private Long viewCount;
	
	// Join
	// --------------------------------------------------------------------------------------------------------------------------------
	// [File Join]

	@OneToMany(fetch = FetchType.LAZY)
	private List<FileDTO> files = new ArrayList<FileDTO>();
	
	// [Comment Join]
	@OneToMany(fetch = FetchType.LAZY)
	private List<CommentDTO> comments = new ArrayList<CommentDTO>();

	// Build
	// --------------------------------------------------------------------------------------------------------------------------------
	// DtoToEntity
	// 설명 : 해당 함수는 entity로 변경해주는 과정에서  user객체로 넘겨줄 수 없기 때문에 Board에 있는 updateBoard와 함께 사용해야함
	public static  Board boardDtotoEntity(BoardDTO boardDTO) {
		Board board = Board.builder()
						   .boardNo(boardDTO.getBoardNo())
						   .boardContent(boardDTO.getBoardContent())
						   .likeCount(0L)
						   .viewCount(0L)
						   .build();
		return board;
	}
	
}
