package com.spring.board.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.spring.board.repository.mapping.BoardMapping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MypageDTO {
	
	
	private Long count;
	
	List<BoardMapping> boardDTOs;
}
