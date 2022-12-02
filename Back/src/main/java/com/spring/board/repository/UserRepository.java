package com.spring.board.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.board.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
	// 입력한 ID에 해당하는 User의 객체 출력
	public User findByUserId(String userId);
	// 입력한 email과 생년월일에 해당하는 ArrayList출력
	public ArrayList<User> findByEmailAndBirth(String email, String birth);
	// 입력한 ID와 PW에 해당하는 회원 탈퇴
	public void deleteByUserIdAndUserPw(String userId, String userPw);
}
