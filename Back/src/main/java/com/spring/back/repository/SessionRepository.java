package com.spring.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.back.entity.Session;
import com.spring.back.entity.User;

@Repository
public interface SessionRepository extends JpaRepository<Session, String>{
	public Session findByUser(User user);
	
	public void deleteBySessionId(String sessionId);
}
