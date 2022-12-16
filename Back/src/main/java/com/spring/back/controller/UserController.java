package com.spring.back.controller;


import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back.dto.SessionDTO;
import com.spring.back.dto.UserDTO;
import com.spring.back.service.CertifiedServiceImpl;
import com.spring.back.service.MailServiceImpl;
import com.spring.back.service.UserServiceImpl;

@RestController
@RequestMapping(value = "/api", produces = "application/json")
@CrossOrigin(origins = { "http://localhost:3000" })
public class UserController {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Service]
	@Autowired
	UserServiceImpl userService;

	@Autowired
	CertifiedServiceImpl certifiedService;
	
	// [Service]
	@Autowired
	MailServiceImpl mailService;
	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [회원가입]
	@PostMapping(value = "/join")
	public boolean insertUser(@RequestBody UserDTO userDTO, HttpSession session) {
		return userService.insertUser(userDTO);
	}

	// [(비밀번호 찾기용)인증번호 발송]
	@PostMapping(value = "/findPw")
	public int findPwByEmailAndBirthAndUserId(@RequestBody UserDTO userDTO) {
		int checkNum = userService.findPwByEmailAndBirthAndUserId(userDTO.getEmail(), userDTO.getBirth(), userDTO.getUserId());
		mailService.checkEmail(checkNum, userDTO.getEmail());
		return checkNum;
	}
	
	// [인증번호 검증]
	@GetMapping(value = "/checkCertifiedNo")
	public boolean checkCertifiedNo(@RequestParam String userId,int certifiedNo) {
	
		return certifiedService.findByCertifiedNo(userId,certifiedNo);
	}
	
	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [로그인]
	@PostMapping(value = "/login")
	public String login(@RequestBody UserDTO userDTO, HttpSession session) {

		
		 return userService.login(userDTO.getUserId(), userDTO.getUserPw(), session);
	}
	// [로그아웃]
	@PostMapping(value = "/logout")
	public boolean logout(@RequestBody SessionDTO sessionDTO) {
		return userService.logout(sessionDTO.getSessionId());
		
	}
	
	// [ID 중복확인]
	@PostMapping(value = "/userSearch")
	public boolean userSearch(@RequestBody UserDTO userDTO) {
		return userService.searchUserId(userDTO.getUserId());
	}

	// [아이디 찾기]
	@PostMapping(value = "/findId")
	public String[] findUserIdByEmailAndBirth(@RequestBody UserDTO userDTO) {
		String[] userIds = userService.findUserIdByEmailAndBirth(userDTO.getEmail(), userDTO.getBirth());
		return userIds;
	}
	
	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [비밀번호 변경]
	@PostMapping(value = "/updatePw")
	public boolean updatePw(@RequestBody UserDTO userDTO) {
		return userService.updatePw(userDTO);
	}

	// [회원정보 수정]
	@PostMapping(value = "/updateUser")
//	public void updateUserInfo(@ModelAttribute SessionDTO sessionDTO, UserDTO userDTO) {
//		return userService.updateUserInfo(sessionDTO,userDTO);
//	@GetMapping(value = "/updateUser")
	public void updateUserInfo(@RequestBody SessionDTO sessionDTO, @RequestBody UserDTO userDTO) {
		System.out.println(sessionDTO);
		System.out.println(userDTO);
		}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [회원 탈퇴]
	@PostMapping(value = "/deleteUser")
	public boolean deleteUser(@RequestParam String sessionId, @RequestParam String userPw) {
		return userService.deleteUser(sessionId, userPw);
	}
}
