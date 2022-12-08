package com.spring.back.service;

import java.util.List;

public interface MailService {

	// 컨텐츠 관련 (데이터 생성 후 테스트 필요)
	public boolean sendMail(Long first,Long second, Long third);

	public void checkEmail(int checkNum, String email);

}