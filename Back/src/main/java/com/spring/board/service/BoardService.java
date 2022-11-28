package com.spring.board.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.web.multipart.MultipartFile;

import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Board;

public interface BoardService {
	
	public Long insertBoard(BoardDTO boardDTO);
	
	public BoardDTO getBoardByBoardNo(Long BoardNo) throws Exception;
	
	public void deleteBoard(Long boardNo);
	
	
}
