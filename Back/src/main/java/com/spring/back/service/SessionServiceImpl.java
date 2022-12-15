package com.spring.back.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.back.entity.Session;
import com.spring.back.entity.User;
import com.spring.back.repository.SessionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService{
	
	@Autowired
	SessionRepository sessionRepo;
	
	@Override
	public void insertSession(Session session) {
		sessionRepo.save(session);
	}
	
	@Override
	@Transactional
	public boolean deleteSession(String sessionId) {
		sessionRepo.deleteBySessionId(sessionId);
		return true;
	}
	
	@Override
	public Session findByUser(User user) {
		return sessionRepo.findByUser(user);
	}
	
	@Override
	public String findBySessionId(String sessionId) {
		Session session=sessionRepo.findBySessionId(sessionId);
		return session.getUser().getUserId();
	}
}
