package com.spring.back.service;

import java.util.ArrayList;
import java.util.Random;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.back.dto.SessionDTO;
import com.spring.back.dto.UserDTO;
import com.spring.back.entity.Certified;
import com.spring.back.entity.Session;
import com.spring.back.entity.User;
import com.spring.back.repository.CertifiedRepository;
import com.spring.back.repository.SessionRepository;
import com.spring.back.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Repository]
	@Autowired
	UserRepository userRepo;
	@Autowired
	SessionRepository sessionRepo;
	@Autowired
	CertifiedRepository certifiedRepo;

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
		Certified certification = certifiedRepo.findByUser(user);
		Random random = new Random();
		int checkNum = random.nextInt(888888) + 111111;
		Certified certified = Certified.builder().certifiedNo(checkNum).user(user).build();
		if (user != null) {
			if (certification == null) {
				certifiedRepo.save(certified);
				return checkNum;
			} else {
				certifiedRepo.deleteByUser(user);
				certifiedRepo.save(certified);
				return checkNum;
			}

		}
		return 0;
	}

	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [로그인]
	@Override
	@Transactional
	public String login(String userId, String userPw, HttpSession httpsession) {
		User user = userRepo.findByUserId(userId);
		Session usersession = sessionRepo.findByUser(user);
		if (userPw.equals(user.getUserPw())) {
			if (usersession == null) {
				httpsession.setAttribute("userId", user.getUserId());
				String sessionId = httpsession.getId();
				Session session = Session.builder().sessionId(sessionId).user(user).build();
				sessionRepo.save(session);
				return sessionId;
			}
			else {
				sessionRepo.deleteBySessionId(usersession.getSessionId());
				httpsession.setAttribute("userId", user.getUserId());
				String sessionId = httpsession.getId();
				Session session = Session.builder().sessionId(sessionId).user(user).build();
				sessionRepo.save(session);
				return sessionId;
			}
		}
		return null;
	}
	// [로그아웃]
	@Override
	public boolean logout(String sessionId) {
		sessionRepo.deleteById(sessionId);
			return true;
	
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
	public boolean updatePw(UserDTO userDTO) {
		User user = userRepo.findByUserId(userDTO.getUserId());
		user.updatePw(userDTO);
		certifiedRepo.deleteByUser(user);
		userRepo.save(user);
		return true;
	}

	// [회원정보 불러오기]
	@Override
	public UserDTO findUserData(SessionDTO sessionDTO) {
		Session session = sessionRepo.findBySessionId(sessionDTO.getSessionId());
	
		return User.userEntityToDTO(session.getUser());
	}
	// [회원정보 수정]
	@Override
	@Transactional
	public boolean updateUserInfo(SessionDTO sessionDTO,UserDTO newUserDTO) {
		Session session = sessionRepo.findBySessionId(sessionDTO.getSessionId());
		session.getUser().updateUser(newUserDTO);
		
		return true;
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [회원 탈퇴]
	@Override
	@Transactional
	public boolean deleteUser(String sessionId, String userPw) {
		User userSession = sessionRepo.findBySessionId(sessionId).getUser();

		if (userSession.getUserPw().equals(userPw)) {
			userRepo.deleteById(userSession.getUserId());
			return true;
		}
		return false;
	}
}
