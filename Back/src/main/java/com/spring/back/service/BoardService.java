package com.spring.back.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.spring.back.dto.BoardDTO;
import com.spring.back.dto.MypageDTO;

public interface BoardService {
	
	// [게시글 작성]
	public Long insertBoard(BoardDTO boardDTO);

	// [특정 게시글 불러오기]
	public BoardDTO getBoardByBoardNo(Long BoardNo);

	// [개인 페이지 게시글 불러오기]
	public MypageDTO getBoardByUserId(String userId);

	// [게시글 수정]
	public BoardDTO updateBoard(BoardDTO newboardDTO, List<MultipartFile> files);

	// [게시글 삭제]
	public boolean deleteBoard(BoardDTO boardDTO);

}
