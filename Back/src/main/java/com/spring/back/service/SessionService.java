package com.spring.back.service;

import com.spring.back.entity.Session;
import com.spring.back.entity.User;

public interface SessionService {
	
	public void insertSession(Session session);
	public boolean deleteSession(String sessionId);
	public Session findByUser(User user);
	public String findBySessionId(String sessionId);
}
