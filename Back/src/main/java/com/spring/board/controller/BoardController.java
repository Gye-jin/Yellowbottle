package com.spring.board.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Tag;
import com.spring.board.service.BoardServiceImpl;
import com.spring.board.service.FileServiceImpl;
import com.spring.board.service.TagServiceImpl;
import com.spring.board.tag.tag;         
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
	
	@Autowired
	TagServiceImpl tagService;

	@PostMapping("/board")
	public void createBoard(@ModelAttribute BoardDTO boardDTO, @RequestParam("files") List<MultipartFile> files,@RequestParam("tag") List<tag> tags) {
		
		
		Long boardId = boardservice.insertBoard(boardDTO);
		 

		fileService.insertFile(boardId, files);
		tagService.insertTag(boardId, tags);
		
	}
		
	
	@GetMapping("/board/{boardNo}")
	public BoardDTO getBoard(@PathVariable Long boardNo) {
	
		BoardDTO boardDTO = null;

		boardDTO = boardservice.getBoardByBoardNo(boardNo);
		
		return boardDTO;

	}
	
	
//	 마이페이지에서 유저 아이디로 접속을 했을 경우에 해당 유저 아이디의 
//	@GetMapping("/boardList/{userId}")
//	public List<BoardDTO> getBoards(@PathVariable String userId){
//		
//		List<BoardDTO> boardDTOs= null;
//
//		boardDTOs = boardservice.getBoardByUserId(userId);
//		
//		return boardDTOs;
//	}
//	
	@GetMapping(value ="/boardupdate/{boardNo}")
	public void updateBoard(@RequestParam Long boardNo,@RequestParam Tag tag, @ModelAttribute BoardDTO newboardDTO) {
		boardservice.updateBoard(boardNo, tag, newboardDTO);
	}
	
	@DeleteMapping("/boarddelete/{boardNo}")
	public void deleteBoard(@PathVariable Long boardNo) {
		
		boardservice.deleteBoard(boardNo);
		
	}
	
	
	
	
}
