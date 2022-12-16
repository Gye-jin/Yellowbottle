package com.spring.back.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;

import com.spring.back.dto.BoardDTO;
import com.spring.back.dto.PersonpageDTO;
import com.spring.back.dto.SessionDTO;

public interface BoardService {
	
	// [게시글 작성]
	public BoardDTO insertBoard(SessionDTO sessionDTO, BoardDTO boardDTO);

	// [전체 게시글 불러오기]
	public List<BoardDTO> findBoardsByPage(PageRequest pageRequest);

	// [특정 게시글 불러오기]
	public BoardDTO getBoardByBoardNo(String sessionId, Long boardNo);
	
	// [수정 전 게시글 불러오기]
	public BoardDTO findBoardByBoardNo(Long boardNo);

	// [추천게시글 가져오기]
	public List<BoardDTO> findRecoBoard(Long boardNo);

	// [개인 페이지 게시글 불러오기]
	public PersonpageDTO getBoardByUserId(String userId);

	// [게시글 수정]
	public boolean updateBoard(SessionDTO sessionDTO, BoardDTO newboardDTO, List<MultipartFile> files);
	
	// [추천 +1]
	public BoardDTO updateLikeCount(Long boardDTONo);
	
	// [게시글 삭제]
	public boolean deleteBoard(SessionDTO sessionDTO, BoardDTO boardDTO);

}
