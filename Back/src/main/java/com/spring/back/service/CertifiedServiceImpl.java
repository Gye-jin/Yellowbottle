package com.spring.back.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.back.common.ErrorCode;
import com.spring.back.common.exception.ApiControllerException;
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
		Optional<Certified> certified=certifiedRepo.findByCertifiedNo(certifiedNo);
		if(!certified.isPresent()) {
			certified.orElseThrow(() -> new ApiControllerException(ErrorCode.UNAUTHORIZED));
			return false;
		}
		return true;
	}
	
	
}
