package com.spring.board.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Board;
import com.spring.board.entity.Tag;
import com.spring.board.repository.mapping.BoardMapping;
import com.spring.board.tag.Category;

public interface BoardService {
	
	public Long insertBoard(BoardDTO boardDTO);
	
	public BoardDTO getBoardByBoardNo(Long BoardNo) throws Exception;
	
	public void deleteBoard(Long boardNo);
	
//	public BoardMapping getBoardByUserId(String userId);
//	public void getBoardByUserId(String userId);
	public List<BoardMapping> getBoardByUserId(String userId);

	
	public void updateBoard(Long boardNo, Tag tag, BoardDTO newboardDTO);
}
