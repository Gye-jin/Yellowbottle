package com.spring.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back.dto.UserDTO;
import com.spring.back.service.UserServiceImpl;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = { "http://localhost:3000" })
public class UserController {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Service]
	@Autowired
	UserServiceImpl userService;

	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [회원가입]
	@PostMapping(value = "/join")
	public boolean insertUser(@RequestBody UserDTO userDTO) {
		return userService.insertUser(userDTO);
	}

	// [(비밀번호 찾기용)인증번호 발송]
	@GetMapping(value = "/findPw")
	public int findPwByEmailAndBirthAndUserId(@RequestParam String email, @RequestParam String birth,
			@RequestParam String userId) {
		return userService.findPwByEmailAndBirthAndUserId(email, birth, userId);
	}
	
	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [로그인]
	@PostMapping(value = "/login")
	public boolean login(@RequestBody UserDTO userDTO) {
		return userService.login(userDTO.getUserId(), userDTO.getUserPw());
	}

	// [ID 중복확인]
	@PostMapping(value = "/userSearch")
	public boolean userSearch(@RequestBody UserDTO userDTO) {
		return userService.searchUserId(userDTO.getUserId());
	}

	// [아이디 찾기]
	@GetMapping(value = "/findId")
	public String[] findUserIdByEmailAndBirth(@RequestParam String email, @RequestParam String birth) {
		String[] userIds = userService.findUserIdByEmailAndBirth(email, birth);
		return userIds;
	}
	
	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [비밀번호 변경]
	@PostMapping(value = "/updatePw")
	public boolean updatePw(@RequestParam String userId, @RequestParam String newUserPw) {
		return userService.updatePw(userId, newUserPw);
	}

	// [회원정보 수정]
	@PutMapping(value = "/updateUser")
	public UserDTO updateUserInfo(@RequestBody UserDTO userDTO) {
		return userService.updateUserInfo(userDTO);
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [회원 탈퇴]
	@PostMapping(value = "/deleteUser")
	public boolean deleteUser(@RequestParam String userId, @RequestParam String userPw) {
		return userService.deleteUser(userId, userPw);
	}
}
