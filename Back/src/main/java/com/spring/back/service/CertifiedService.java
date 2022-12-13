package com.spring.back.service;

import com.spring.back.entity.Certified;
import com.spring.back.entity.User;

public interface CertifiedService {
	
	public void insertCertified(Certified certified);
	public void deleteCertified(User user);
	public Certified findByUser(User user);
	public boolean findByCertifiedNo(String userId,int certifiedNo);
}
