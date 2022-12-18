package com.spring.back.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

import com.spring.back.dto.BoardDTO;
import com.spring.back.dto.SessionDTO;
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
	public BoardDTO createBoard(@ModelAttribute SessionDTO sessionDTO, @ModelAttribute BoardDTO boardDTO, @RequestParam("image") List<MultipartFile> images) {
		// 게시글 삽입 후 게시글 번호 가져오기
		BoardDTO board=boardService.insertBoard(sessionDTO, boardDTO);
		// 해당하는 게시글 번호에 맞춰 파일과 태그 DB에 삽입
		fileService.uploadFile(board.getBoardNo(), images);
	
		return board;
	}

	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	/* [특정 게시글 불러오기]
	 * 설명1 : boardNo에 해당하는 board 가져오기
	 */
	@GetMapping("/board/{boardNo}")
	public BoardDTO findBoard(@RequestParam String sessionId, @PathVariable Long boardNo) {
		BoardDTO boardDTO =  boardService.getBoardByBoardNo(sessionId,boardNo);
		return boardDTO;
	}
	
	/* [(세부 게시글 확인 전용)특정 게시글 불러오기]
	 * 설명1 : boardNo에 해당하는 board 가져오기
	 * 설명2 : 추천 게시글 3개씩 더 가져오기
	 * click : 특정 게시글 클릭시 조회수 +1
	 * 출력 : List[불러올 게시글, 추천게시글1, 추천게시글2, 추천게시글3]
	 */
	@GetMapping("/recomendBoard/{boardNo}")
	public List<BoardDTO> findRecommendBoard(@PathVariable Long boardNo) {
		return boardService.findRecoBoard(boardNo);
	}


	// [전체 게시글]
	// 설명 : 최신 순으로 10개씩 게시글 불러오기(필요)
	@GetMapping("/Allboard")
	public List<BoardDTO> getBoardPages(@RequestParam int pageNo) {
		PageRequest pageRequest = PageRequest.of(pageNo-1, 10, Sort.by("boardNo").descending() ); 
	    return boardService.findBoardsByPage(pageRequest);
	}

	
	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [수정 게시글 불러오기]
	// 설명 : 게시글 수정하기에 들어갔을 때 현재 게시글의 정보를 그대로 보여주기
	// click : 게시글 수정하기
	@GetMapping("/boardUpdate/{boardNo}")
	public BoardDTO getUpdateBoard(@PathVariable Long boardNo) {
		BoardDTO boardDTO = boardService.findBoardByBoardNo(boardNo);
		
		return boardDTO;
	}

	// [게시글 수정]
	// 설명 : 수정한 게시글 내용으로 게시글 업데이트
	// click : 게시글 수정 완료
	@PostMapping(value = "/boardupdate")
	public boolean updateBoard(@ModelAttribute SessionDTO sessionDTO,BoardDTO boardDTO, @RequestParam(value ="images", required = false) List<MultipartFile> images) {
		
		boolean result = boardService.updateBoard(sessionDTO,boardDTO);
		
			// 새로운 File 추가
			fileService.updateFile(boardDTO.getBoardNo(), images);	
		
		return result;
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 삭제]
	// 설명 : 본인 게시글 지우기
	@PostMapping("/boarddelete")
	public boolean deleteBoard(@ModelAttribute SessionDTO sessionDTO,BoardDTO boardDTO) {

		return boardService.deleteBoard(sessionDTO,boardDTO);
	}
}
