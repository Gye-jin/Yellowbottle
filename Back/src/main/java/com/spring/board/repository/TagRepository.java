package com.spring.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.board.dto.TagDTO;
import com.spring.board.entity.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long>{
	
	public Tag save(TagDTO tagDTO);
	
	void deleteByBoardNo(Long no);
}
