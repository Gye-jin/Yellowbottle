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
import com.spring.board.tag.Category;         
import lombok.extern.slf4j.Slf4j;

// 보안적인 측면에서 논의 필요
// => url로 요청을 보내면 바로 함수가 실행된다는 문제가 발생
@Slf4j
@RestController
@RequestMapping(value="/api", produces = "application/json")
@CrossOrigin(origins = {"http://localhost:3000"})
public class BoardController {
	// Service 연결
	@Autowired
	BoardServiceImpl boardservice;
	@Autowired
	FileServiceImpl fileService;
	@Autowired
	TagServiceImpl tagService;

	// Create ------------------------------------------------------------------------------------------------------
	// 새로운 게시글 작성하기
	@PostMapping("/board")
	public void createBoard(@ModelAttribute BoardDTO boardDTO, @RequestParam("files") List<MultipartFile> files, @RequestParam("tag") List<Category> tags) {
		// 게시글 삽입 후 게시글 번호 가져오기
		Long boardId = boardservice.insertBoard(boardDTO);
		 
		// 해당하는 게시글 번호에 맞춰 파일과 태그 DB에 삽입
		fileService.insertFile(boardId, files);
		tagService.insertTag(boardId, tags);
	}
	
	// Read --------------------------------------------------------------------------------------------------------
	// 게시글 번호를 사용하여 게시글 불러오기
	@GetMapping("/board/{boardNo}")
	public BoardDTO getBoard(@PathVariable Long boardNo) {
		// boardService를 거쳐 DB에 들어있는 게시글 가져오기
		BoardDTO boardDTO = boardservice.getBoardByBoardNo(boardNo);
		// 게시글 객체 반환
		return boardDTO;
	}
	
	// 최신 순으로 10개씩 게시글 불러오기(필요)
	
	// 태그별 최신 순 10개씩 게시글 불러오기(필요)
	
	// Update ------------------------------------------------------------------------------------------------------
	// 게시글 번호를 활용하여 게시글 업데이트
	@GetMapping(value ="/boardupdate/{boardNo}")
	public void updateBoard(@RequestParam Long boardNo, @RequestParam Tag tag, @ModelAttribute BoardDTO newboardDTO) {
		// tag에 대한 논의가 필요함
		// => 여러 태그가 존재하는 경우가 있기 때문에 List로 변경 필요
		boardservice.updateBoard(boardNo, tag, newboardDTO);
	}
	
	// Delete ------------------------------------------------------------------------------------------------------
	// 게시글 번호를 통해 게시글 삭제
	@DeleteMapping("/boarddelete/{boardNo}")
	public void deleteBoard(@PathVariable Long boardNo) {
		boardservice.deleteBoard(boardNo);
	}
}
