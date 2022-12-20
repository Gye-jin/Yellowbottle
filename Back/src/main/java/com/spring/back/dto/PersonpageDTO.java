package com.spring.back.dto;

import java.util.ArrayList;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.spring.back.repository.mapping.BoardMapping;
import com.spring.back.user.UserGrade;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PersonpageDTO {
	// 회원 등급
	@Enumerated(EnumType.STRING)
	private UserGrade grade;
	// 마이페이지 여부
	private boolean editor;
	// 댓글 수
	private Long countComment;
	// 게시글 수
	private Long countBoard;
	// boardList
	ArrayList<BoardMapping> boards;
	
	
}
