package com.spring.back.service;

import javax.servlet.http.HttpSession;

import com.spring.back.dto.SessionDTO;
import com.spring.back.dto.UserDTO;

public interface UserService {

	// [회원가입]
	public boolean insertUser(UserDTO userDTO);
	
	// [인증번호 발급]
	public int findPwByEmailAndBirthAndUserId(String email, String birth, String UserId);
	
	// [로그인]
	public String login(String userId, String userPw, HttpSession session);
	
	// [로그아웃]
	public boolean logout(String sessionId);
	
	// [아이디 중복 확인]
	public boolean searchUserId(String userId);

	// [아이디 찾기]
	public String[] findUserIdByEmailAndBirth(String email, String birth);

	// [비밀번호 변경]
	public boolean updatePw(UserDTO userDTO);
	
	// [회원정보 가져오기]
	public UserDTO findUserData(SessionDTO sessionDTO);

	// [회원정보 수정]
	public boolean updateUserInfo(SessionDTO sessionDTO,UserDTO newUserDTO);
	
	// [회원 탈퇴]
	public boolean deleteUser(String userId, String userPw);
	
	// [회원 등급 업데이트]
	public void updateUserRank();
}
