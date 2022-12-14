package com.spring.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.back.content.ContentCategory;
import com.spring.back.entity.Content;

public interface ContentRepository extends JpaRepository<Content, Long>{
	// Content객체를 저장 후 반환
	public Content save(Content content);
	
	public Content findByContentNo(Long contentNo);
	
	// contentNo에 해당하는 모든 컨텐츠 삭제
	@Modifying
	@Query("DELETE FROM Content c WHERE contentNo = :no")
	void deleteBycontentNo(@Param("no") Long contentNo);
	
	public List<Content> findByContentCategory(ContentCategory contentCategory);
	
}
