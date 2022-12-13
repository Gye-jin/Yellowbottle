package com.spring.back.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.back.dto.BoardDTO;
import com.spring.back.dto.MypageDTO;
import com.spring.back.service.BoardServiceImpl;
import com.spring.back.service.FileServiceImpl;

@RestController
@RequestMapping(value = "/api", produces = "application/json")
@CrossOrigin(origins = { "http://localhost:3000" })
public class BoardController {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Service]
	@Autowired
	BoardServiceImpl boardService;
	@Autowired
	FileServiceImpl fileService;

	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 작성]
	@PostMapping("/board")
	public Long createBoard(@ModelAttribute BoardDTO boardDTO, @RequestParam("files") List<MultipartFile> files) {
		// 게시글 삽입 후 게시글 번호 가져오기
		Long boardNo = boardService.insertBoard(boardDTO);
		// 해당하는 게시글 번호에 맞춰 파일과 태그 DB에 삽입
		fileService.uploadFile(boardNo, files);
		return boardNo;
	}

	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [특정 게시글 불러오기]
	// 설명 : boardNo에 해당하는 board 가져오기
	// click : 특정 게시글 클릭시 조회수 +1
	@GetMapping("/board/{boardNo}")
	public BoardDTO getBoard(@PathVariable Long boardNo) {
		// boardService를 거쳐 DB에 들어있는 게시글 가져오기
		BoardDTO boardDTO = boardService.getBoardByBoardNo(boardNo);
		return boardDTO;
	}

	// [개인 페이지 게시글 불러오기]
	// 설명 : userId에 해당하는 page 가져오기
	// click : 마이페이지 혹은 다른 사람의 페이지에 접속
	@GetMapping("/mypage/{userId}")
	public MypageDTO getBoards(@PathVariable String userId) {
		return boardService.getBoardByUserId(userId);
	}

	// [전체 게시글]
	// 설명 : 최신 순으로 10개씩 게시글 불러오기(필요)
	@GetMapping("/Allboard")
	public List<BoardDTO> getBoardPages(@RequestParam int pageNo) {
		PageRequest pageRequest = PageRequest.of(pageNo-1, 10, Sort.by("boardNo").descending() ); 
	    return boardService.findBoardsByPage(pageRequest);
	}
	
	// [추천 게시글]
	// 설명 : 특정 게시글 내에서 다음 추천 게시글로 넘어갈 때 나오는 게시글(필요)

	
	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [수정 게시글 불러오기]
	// 설명 : 게시글 수정하기에 들어갔을 때 현재 게시글의 정보를 그대로 보여주기
	// click : 게시글 수정하기
	@GetMapping("/boardUpdate/{boardNo}")
	public BoardDTO getUpdateBoard(@PathVariable Long boardNo) {
		BoardDTO boardDTO = boardService.getBoardByBoardNo(boardNo);
		return boardDTO;
	}

	// [게시글 수정]
	// 설명 : 수정한 게시글 내용으로 게시글 업데이트
	// click : 게시글 수정 완료
	@PostMapping(value = "/boardupdate")
	public BoardDTO updateBoard(@RequestParam String userSession, @ModelAttribute BoardDTO boardDTO,
			@RequestParam("files") List<MultipartFile> files) {
		BoardDTO newBoardDTO = boardService.updateBoard(boardDTO,files);
		return newBoardDTO;
	}
	
	// [추천]
	// 설명 : 좋아요 누를 경우 게시글 반영
	// click : 좋아요 +1
	@PostMapping(value = "/likeupdate")
	public BoardDTO updateLike(@RequestBody BoardDTO boardDTO) {
		BoardDTO newBoardDTO = boardService.updateLikeCount(boardDTO.getBoardNo());
		return newBoardDTO;
	}
	


	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 삭제]
	// 설명 : 본인 게시글 지우기
	@DeleteMapping("/boarddelete")
	public boolean deleteBoard(@RequestBody BoardDTO boardDTO) {
		return boardService.deleteBoard(boardDTO);
	}
}
