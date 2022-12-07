package com.spring.back.service;

public interface MailService {

	// 컨텐츠 관련 (데이터 생성 후 테스트 필요)
	public boolean sendMail(Long contentNo);

	public void checkEmail(int checkNum, String email);

}