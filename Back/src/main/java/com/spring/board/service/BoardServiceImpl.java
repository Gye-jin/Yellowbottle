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
import com.spring.board.entity.Tag;
import com.spring.board.repository.BoardRepository;
import com.spring.board.repository.mapping.BoardMapping;
import com.spring.board.tag.tag;


@Service
public class BoardServiceImpl implements BoardService{
	
	
	@Autowired
	BoardRepository boardRepo;
	
	@Autowired
	FileServiceImpl fileService;
	
	@Autowired
	TagServiceImpl tagService;
	
	@Override
	public Long insertBoard(BoardDTO boardDTO) {
	Board board = boardDTO.dtotoEntity(boardDTO);
	
	return boardRepo.save(board).getNo();
	
	}

	@Override
	@Transactional
	public BoardDTO getBoardByBoardNo(Long BoardNo) throws NoSuchElementException{
		
		Board board = boardRepo.findById(BoardNo).orElseThrow(NoSuchElementException::new);
		
			
		BoardDTO boardDTO = board.entitytoDTO(board);
		
		return boardDTO;
	}
	
	@Override
	@Transactional
	public void deleteBoard(Long boardNo){
		
		tagService.deleteTagBoard(boardNo);
		fileService.deleteFileBoard(boardNo);
		boardRepo.deleteById(boardNo);
		
	}
	
//	@Override
//	@Transactional
//	public List<BoardDTO> getBoardByUserId(String userId) {
//		
//		List<Board> boards = boardRepo.findByUserId(userId);
//		
//		List<BoardDTO> boardDTOs = boards.stream()
//				  .map(board -> board.entitytoDTO(board))
//				  .collect(Collectors.toList());
//
//		return boardDTOs;
//	}
	
	@Override
	@Transactional
	// userId로 board의 boardNo, userId, files의 fileName만 출력하는 메소드 -> 
	// 수정 예정 : 1) Entity 출력을 DTO 혹은 다른 객체로 변경?, Mapping을 써야 하는가?
	public List<BoardMapping> getBoardByUserId(String userId) {
		
		List<BoardMapping> boardMappings = null;
			boardMappings = boardRepo.findByUserId(userId);
		
		return boardMappings;
	}
	
	@Override
	@Transactional
	public void updateBoard(Long boardNo, Tag tag, BoardDTO newboardDTO) {

	
	Board board = boardRepo.getById(boardNo);
	
	tag.updateTag(tag);
	
	board.updateBoard(newboardDTO);
	

	}
	

	
}
