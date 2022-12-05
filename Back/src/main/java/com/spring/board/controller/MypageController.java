package com.spring.board.controller;

import java.util.List;

import org.hibernate.query.criteria.internal.expression.function.LengthFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.board.dto.BoardDTO;
import com.spring.board.dto.MypageDTO;
import com.spring.board.repository.BoardRepository;
import com.spring.board.repository.mapping.BoardMapping;
import com.spring.board.service.BoardServiceImpl;
import com.spring.board.service.FileServiceImpl;
import com.spring.board.service.TagServiceImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value="/api", produces = "application/json")
@CrossOrigin(origins = {"http://localhost:3000"})
public class MypageController {

	@Autowired
	BoardServiceImpl boardservice;
		
	@Autowired
	FileServiceImpl fileService;
	
	@Autowired
	TagServiceImpl tagService;
	
	@Autowired
	BoardRepository boardrepo;
	
//	 마이페이지에서 유저 아이디로 접속을 했을 경우에 해당 유저 아이디의 
	@GetMapping("/mypage/{userId}")
	public MypageDTO getBoards(@PathVariable String userId){
		
		
		List<BoardMapping> boardMappings=  boardservice.getBoardByUserId(userId);
		Long count =boardrepo.countByUserId(userId);
		
		MypageDTO mypageDTO = MypageDTO.builder()
				.count(count)
				.boardDTOs(boardMappings)
				.build();
		
		
		return mypageDTO;
	}
	@GetMapping("/mypage/count/{userId}")
	public Long getCount(@PathVariable String userId){
		
		Long count= null;
		
		count=boardrepo.countByUserId(userId);
		
		return count;
	}
}
