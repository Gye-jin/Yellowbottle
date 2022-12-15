package com.spring.back.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardstatusDTO {
	// 내 게시글 여부
	private boolean Editor;
	
	// board
	private BoardDTO board;
}
