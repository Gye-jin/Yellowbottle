package com.spring.board.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.LastModifiedDate;

import com.spring.board.entity.Board;
import com.spring.board.entity.File;

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
