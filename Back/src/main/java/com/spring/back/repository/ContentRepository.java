package com.spring.back.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.back.content.ContentCategory;
import com.spring.back.entity.Content;

public interface ContentRepository extends JpaRepository<Content, Long>{
	
	public Content findByContentNo(Long contentNo);
		
	public List<Content> findTop10ByContentCategoryAndDateAndSendDateIsNullOrderByContentNoDesc(ContentCategory contentCategory, LocalDate date);
	
	public List<Content> findByContentCategoryAndSendDateIsNotNullOrderBySendDateDesc(ContentCategory contentCategory);
	
}
