package com.spring.back.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.back.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	// 입력한 ID에 해당하는 User의 객체 출력
	public User findByUserId(String userId);

	// 입력한 email과 생년월일에 해당하는 ArrayList출력
	public ArrayList<User> findByEmailAndBirth(String email, String birth);

	// 입력한 ID와 PW에 해당하는 회원 탈퇴
	public void deleteByUserIdAndUserPw(String userId, String userPw);

	// 구독여부가 true인 유저들만 출력
	public ArrayList<User> findBySubStatus(boolean subStatus);

	// 입력한 email과 생년월일,아이디에 해당하는 User출력
	public User findByEmailAndBirthAndUserId(String email, String birth, String UserId);
}
