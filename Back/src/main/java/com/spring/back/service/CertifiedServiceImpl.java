package com.spring.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.back.entity.Certified;
import com.spring.back.repository.CertifiedRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CertifiedServiceImpl implements CertifiedService{
	
	@Autowired
	CertifiedRepository certifiedRepo;
	
	// 인증번호에 해당하는 회원 아이디 찾기
	// --------------------------------------------------------------------------------------------------------------------------------
	// [인증번호 저장]
	@Override 
	public boolean findByCertifiedNo(String userId,int certifiedNo) {
		Certified certified=certifiedRepo.findByCertifiedNo(certifiedNo);

		if(userId == certified.getUser().getUserId()) {
			return true;
		}
		return false;
	}
	
	
}
