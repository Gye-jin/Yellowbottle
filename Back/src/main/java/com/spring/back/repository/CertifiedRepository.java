package com.spring.back.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.back.entity.Certified;
import com.spring.back.entity.User;

@Repository
public interface CertifiedRepository extends JpaRepository<Certified, Integer>{
	
	@Transactional
	public void deleteByUser(User user);
	
	public Optional<Certified> findByUser(User user);
	
	public Optional<Certified> findByCertifiedNo(Integer certifiedNo);
}
