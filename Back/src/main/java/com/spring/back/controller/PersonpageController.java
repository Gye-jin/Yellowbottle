package com.spring.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back.dto.PersonpageDTO;
import com.spring.back.entity.Session;
import com.spring.back.service.BoardServiceImpl;
import com.spring.back.service.SessionServiceImpl;



@RestController
@RequestMapping(value = "/api", produces = "application/json")
@CrossOrigin(origins = { "*" })
public class PersonpageController {
	
	@Autowired
	BoardServiceImpl boardService;
	
	@Autowired
	SessionServiceImpl sessionService;
	
	
	// [마이페이지 접속을 위한 userId값 불러오기]
	@PostMapping("/mypage")
	public String getUserId (@RequestBody Session session) {
		
		return sessionService.findBySessionId(session.getSessionId());
	}
	
	// [개인 페이지 게시글 불러오기]
	// 설명 : userId에 해당하는 page 가져오기
	// click : 마이페이지 혹은 다른 사람의 페이지에 접속
	@GetMapping("/mypage/{userId}")
	public PersonpageDTO getBoards(@PathVariable String userId) {
		return boardService.getBoardByUserId(userId);
	}
}
