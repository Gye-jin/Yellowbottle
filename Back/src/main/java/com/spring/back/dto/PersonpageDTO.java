package com.spring.back.dto;

import java.util.ArrayList;

import com.spring.back.repository.mapping.BoardMapping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PersonpageDTO {
	
	// 마이페이지 여부
	private boolean Editor;
	// 댓글 수
	private Long countComment;
	// 게시글 수
	private Long countBoard;
	// boardList
	ArrayList<BoardMapping> boardDTOs;
	
	
}
