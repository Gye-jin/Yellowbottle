package com.spring.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.dto.UserDTO;
import com.spring.board.entity.User;
import com.spring.board.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepo;
	
	// 회원가입 ------------------------------------------------------------------------------------
	// 회원가입
	@Override
	public boolean insertUser(UserDTO userDTO) {
		// 전달받은 DTO객체를 Entity객체로 전환
		User user = UserDTO.userDTOToEntity(userDTO);
		// save를 통해 user Entity객체 DB에 삽입
		userRepo.save(user).getUserId();
		return true;
	}
	
	// 조회 ------------------------------------------------------------------------------------
	// 회원가입 시 아이디 중복 확인용
	// userId를 받아 조회 후 존재할 경우 true
	@Override
	public boolean searchUserId(String userId) {
		if(userRepo.findByUserId(userId) != null) {
			return true;
		}
		return false;
	}
	
	// 아이디 찾기
	@Override
	public String[] findUserIdByEmailAndBirth(String email, String birth) {
		ArrayList<User> users = userRepo.findByEmailAndBirth(email, birth);
		String[] userIds = new String[users.size()];
		
		for(int i=0; i<users.size(); i++) {
//			System.out.println(users.get(i).getUserId());
			userIds[i] = users.get(i).getUserId();
		}
		return userIds;
	}
	// 회원정보 수정 ------------------------------------------------------------------------------------
	@Override
	public UserDTO updateUserInfo(UserDTO newUserDTO) {
		User NewUser = UserDTO.userDTOToEntity(newUserDTO);
		userRepo.save(NewUser);
		User updateUser = userRepo.findById(newUserDTO.getUserId()).orElseThrow(NoSuchElementException::new);
		return User.userEntityToDTO(updateUser);
	}
	
	
	// 회원 탈퇴 ------------------------------------------------------------------------------------
	// userId와 userPw를 받아 해당 유저 삭제
	@Override
	@Transactional
	public boolean deleteUser(String userId, String userPw) {
//		System.out.println(userId + " - " + userPw);
//		userRepo.deleteByUserIdAndUserPw(userId, userPw);
		User user = userRepo.findById(userId).orElseThrow(NoSuchElementException::new);
		
		if(user.getUserPw().equals(userPw)) {
			userRepo.deleteById(userId);
			return true;
		}
		return false;
	}
	
}
