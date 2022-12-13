package com.spring.back.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.back.entity.Certified;
import com.spring.back.entity.User;
import com.spring.back.repository.CertifiedRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CertifiedServiceImpl implements CertifiedService{
	
	@Autowired
	CertifiedRepository certifiedRepo;

	@Override
	public void insertCertified(Certified certified) {
	
		certifiedRepo.save(certified);
		
	}

	@Override
	@Transactional
	public void deleteCertified(User user) {
		certifiedRepo.deleteByUser(user);
		
	}
	
	@Override
	public Certified findByUser(User user) {
	
		return certifiedRepo.findByUser(user);
	}
	@Override 
	public boolean findByCertifiedNo(String userId,int certifiedNo) {
		Certified certified=certifiedRepo.findByCertifiedNo(certifiedNo);

		if(userId == certified.getUser().getUserId()) {
			return true;
		}
		return false;
	}
	
	
}
