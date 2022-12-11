package com.spring.back.service;

import com.spring.back.dto.UserDTO;
import com.spring.back.entity.User;

public interface UserService {

	// [회원가입]
	public boolean insertUser(UserDTO userDTO);
	
	// [인증번호 발급]
	public int findPwByEmailAndBirthAndUserId(String email, String birth, String UserId);
	
	// [로그인]
	public User login(String userId, String userPw);
	
	// [아이디 중복 확인]
	public boolean searchUserId(String userId);

	// [아이디 찾기]
	public String[] findUserIdByEmailAndBirth(String email, String birth);

	// [비밀번호 변경]
	public boolean updatePw(UserDTO userDTO);

	// [회원정보 수정]
	public UserDTO updateUserInfo(UserDTO newUserDTO);
	
	// [회원 탈퇴]
	public boolean deleteUser(String userId, String userPw);

}
