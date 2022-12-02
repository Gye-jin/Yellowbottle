package com.spring.board.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;


import com.spring.board.entity.Board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardDTO {
	
	private Long no;
	private String userId;
	private String boardContent;
	private Long likeCount;
	private LocalDateTime createDate;
	private LocalDateTime modifiedDate;	
	private Long viewCount;

	@OneToMany(fetch = FetchType.LAZY)
	List<FileDTO> fileDTOs = new ArrayList<FileDTO>();
	
	@OneToMany(fetch = FetchType.LAZY)
	List<TagDTO> tagDTOs = new ArrayList<TagDTO>();

	
	public static  Board dtotoEntity(BoardDTO boardDTO) {
		Board board = Board.builder()
						   .userId(boardDTO.getUserId())
						   .boardContent(boardDTO.getBoardContent())
						   .likeCount(0L)
						   .viewCount(0L)
						   .build();
		return board;
	}
	

	

}
