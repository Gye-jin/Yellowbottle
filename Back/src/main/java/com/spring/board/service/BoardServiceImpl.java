package com.spring.board.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Board;
import com.spring.board.repository.BoardRepository;

@Service
public class BoardServiceImpl implements BoardService{
	
	
	@Autowired
	BoardRepository boardRepo;
	
	
	@Autowired
	FileServiceImpl fileService;
	
	@Override
	public Long insertBoard(BoardDTO boardDTO) {
	Board board = boardDTO.dtotoEntity(boardDTO);
	
	System.out.println(board);
	return boardRepo.save(board).getNo();
	
	}

	@Override
	public BoardDTO getBoardByBoardNo(Long BoardNo) throws NoSuchElementException{
		
		Board board = boardRepo.findById(BoardNo).orElseThrow(NoSuchElementException::new);
		
			
		BoardDTO boardDTO = board.entitytoDTO(board);
		
		return boardDTO;
	}
	
	@Override
	public void deleteBoard(Long boardNo){
		
		
		fileService.deleteFileBoard(boardNo);
		boardRepo.deleteById(boardNo);
		
		
	}
	
	
	

	
}
