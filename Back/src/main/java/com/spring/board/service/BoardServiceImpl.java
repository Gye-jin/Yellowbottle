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
import com.spring.board.tag.Category;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{
	
	// Repository와 연결
//	@Autowired
	final	BoardRepository boardRepo;
//	@Autowired
	final FileServiceImpl fileService;
//	@Autowired
	final TagServiceImpl tagService;
	
	// Create -----------------------------------------------------------------------------------------------------
	@Override
	public Long insertBoard(BoardDTO boardDTO) {
	Board board = boardDTO.boardDtotoEntity(boardDTO);
	
	return boardRepo.save(board).getBoardNo();
	}

	// Read -------------------------------------------------------------------------------------------------------
	// 특정 게시글 불러오기
	@Override
	@Transactional
	public BoardDTO getBoardByBoardNo(Long BoardNo) {
		// 게시글 번호를 활용하여 특정 게시글  받기
		Board board = boardRepo.findById(BoardNo).orElseThrow(NoSuchElementException::new);
		BoardDTO boardDTO = board.boardEntitytoDTO(board);
		
		return boardDTO;
	}
	
	// mypage 형식에 맞춰 게시글 등 불러오기
	@Override
	@Transactional
	// userId로 board의 boardNo, userId, files의 fileName만 출력하는 메소드 -> 
	// 수정 예정 : 1) Entity 출력을 DTO 혹은 다른 객체로 변경?, Mapping을 써야 하는가?
	public List<BoardMapping> getBoardByUserId(String userId) {
		
		List<BoardMapping> boardMappings = null;
		boardMappings = boardRepo.findByUserId(userId);
		
		return boardMappings;
	}
	
	// Update -----------------------------------------------------------------------------------------------------
	@Override
	@Transactional
	public void updateBoard(Long boardNo, Tag tag, BoardDTO newboardDTO) {
		
		Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
		tag.updateTag(tag);
		
		board.updateBoard(newboardDTO);
	}
	
	// Delete -----------------------------------------------------------------------------------------------------
	@Override
	@Transactional
	public void deleteBoard(Long boardNo){
		// 태그, 파일, 게시글 전부 삭제
//		tagService.deleteTagBoard(boardNo);
//		fileService.deleteFileBoard(boardNo);
		boardRepo.deleteById(boardNo);
	}
}
