package com.spring.board.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.board.dto.UserDTO;
import com.spring.board.entity.User;
import com.spring.board.service.UserServiceImpl;

@RestController
@RequestMapping(value = "/api")
public class UserController {
	@Autowired
	UserServiceImpl userService;
	
	// 회원가입 => 성공 시 true, 실패 시 false
	@PostMapping(value = "/join")
	public boolean insertUser(@RequestBody UserDTO userDTO) {
		return userService.insertUser(userDTO);
	}
	
	// 회원가입 시 id 중복 확인 => 이미 존재할 경우 true, 존재하지 않을 경우 false
	@PostMapping(value = "/userSearch")
	public boolean userSearch(@RequestParam String userId) {
		return userService.searchUserId(userId);
	}
	
	// ID찾기 => eamil과 생년월일을 받아 존재하는 아이디 ArrayList형식으로 출력
	@GetMapping(value = "/findId")
	public String[] findUserIdByEmailAndBirth(@RequestParam String email, @RequestParam String birth) {
		String[] userIds = userService.findUserIdByEmailAndBirth(email, birth);
		return userIds;
	}
	
	// 회원정보 수정
	@PutMapping(value = "/updateUser")
	public UserDTO updateUserInfo(@RequestBody UserDTO userDTO) {
		return userService.updateUserInfo(userDTO);
	}
	
	// 회원 탈퇴
	@PostMapping(value = "/deleteUser")
	public boolean deleteUser(@RequestParam String userId, @RequestParam String userPw) {
		return userService.deleteUser(userId, userPw);
	}
}
