package com.spring.back.service;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.back.dto.UserDTO;
import com.spring.back.entity.User;
import com.spring.back.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Repository]
	@Autowired
	UserRepository userRepo;

	// [Service]
	@Autowired
	MailServiceImpl mailService;

	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [회원가입]
	@Override
	public boolean insertUser(UserDTO userDTO) {
		User user = UserDTO.userDTOToEntity(userDTO);
		userRepo.save(user);
		return true;
	}

	// [인증번호 발급]
	// 설명 : 이메일, 생년월일, userId을 통해 데이터에 있을 경우 해당 고객의 이메일로 인증번호 발송
	@Override
	public int findPwByEmailAndBirthAndUserId(String email, String birth, String userId) {
		User user = userRepo.findByEmailAndBirthAndUserId(email, birth, userId);

		if (user != null) {
			Random random = new Random();
			int checkNum = random.nextInt(888888) + 111111;
			mailService.checkEmail(checkNum, email);
			return checkNum;
		}
		return 0;
	}

	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [로그인]
	@Override
	public boolean login(String userId, String userPw) {
		User user = userRepo.findByUserId(userId);
		if (userPw.equals(user.getUserPw())) {
			return true;
		}
		return false;
	}

	// [아이디 중복 확인]
	@Override
	public boolean searchUserId(String userId) {
		if (userRepo.findByUserId(userId) != null) {
			return true;
		}
		return false;
	}

	// [아이디 찾기]
	@Override
	public String[] findUserIdByEmailAndBirth(String email, String birth) {
		ArrayList<User> users = userRepo.findByEmailAndBirth(email, birth);
		String[] userIds = new String[users.size()];
		for (int i = 0; i < users.size(); i++) {
			userIds[i] = users.get(i).getUserId();
		}
		return userIds;
	}

	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [비밀번호 변경]
	@Override
	public boolean updatePw(String userId, String newUserPw) {
		User user = userRepo.findByUserId(userId);
		user.updatePw(newUserPw);
		userRepo.save(user);
		return true;
	}

	// [회원정보 수정]
	@Override
	public UserDTO updateUserInfo(UserDTO newUserDTO) {
		User NewUser = UserDTO.userDTOToEntity(newUserDTO);
		userRepo.save(NewUser);
		User updateUser = userRepo.findById(newUserDTO.getUserId()).orElseThrow(NoSuchElementException::new);
		return User.userEntityToDTO(updateUser);
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [회원 탈퇴]
	@Override
	@Transactional
	public boolean deleteUser(String userId, String userPw) {
//		System.out.println(userId + " - " + userPw);
//		userRepo.deleteByUserIdAndUserPw(userId, userPw);
		User user = userRepo.findById(userId).orElseThrow(NoSuchElementException::new);

		if (user.getUserPw().equals(userPw)) {
			userRepo.deleteById(userId);
			return true;
		}
		return false;
	}
}
