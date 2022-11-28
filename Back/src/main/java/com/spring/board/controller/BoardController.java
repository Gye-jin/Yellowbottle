package com.spring.board.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.IntStream;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Board;
import com.spring.board.repository.BoardRepository;
import com.spring.board.service.BoardServiceImpl;
import com.spring.board.service.FileServiceImpl;

import lombok.extern.slf4j.Slf4j;






@Slf4j
@RestController
@RequestMapping(value="/api", produces = "application/json")
@CrossOrigin(origins = {"http://localhost:3000"})
public class BoardController {
		
	@Autowired
	BoardServiceImpl boardservice;
		
	@Autowired
	FileServiceImpl fileService;

	@PostMapping(value ="/board")
	public void createDiary(@ModelAttribute BoardDTO boardDTO, @RequestParam("file") List<MultipartFile> file) {
		Long boardId = boardservice.insertBoard(boardDTO);
		
		fileService.insertFile(boardId, file);
		
	}
		
	
	@GetMapping("/board/{boardNo}")
	public BoardDTO getDiary(@PathVariable Long boardNo) {
	
		BoardDTO boardDTO = null;

		boardDTO = boardservice.getBoardByBoardNo(boardNo);
		
		return boardDTO;

	}		


}
