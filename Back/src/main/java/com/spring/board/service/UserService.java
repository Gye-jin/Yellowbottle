package com.spring.board.service;

import java.util.ArrayList;

import com.spring.board.dto.UserDTO;
import com.spring.board.entity.User;

public interface UserService {
	public boolean insertUser(UserDTO userDTO);
	public boolean searchUserId(String userId);
	public String[] findUserIdByEmailAndBirth(String email, String birth);
	public boolean deleteUser(String userId, String userPw);
	public UserDTO updateUserInfo(UserDTO newUserDTO);
}
