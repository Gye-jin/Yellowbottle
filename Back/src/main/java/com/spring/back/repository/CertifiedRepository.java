package com.spring.back.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.back.entity.Certified;
import com.spring.back.entity.User;

@Repository
public interface CertifiedRepository extends JpaRepository<Certified, Integer>{
	
	@Transactional
	public void deleteByUser(User user);
	
	public Certified findByUser(User user);
	
	public Certified findByCertifiedNo(Integer certifiedNo);
}
