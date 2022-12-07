package com.spring.board.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.board.dto.CommentDTO;

@RestController
@RequestMapping(value = "/api")
public class CommentController {

	@PostMapping(value = "/insertComment")
	public boolean insertComment(@RequestBody CommentDTO commentDTO) {
		System.out.println("test");
		return true;
	}
}
