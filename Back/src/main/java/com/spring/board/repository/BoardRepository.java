package com.spring.board.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Board;
import com.spring.board.repository.mapping.BoardMapping;



@Repository
public interface BoardRepository extends JpaRepository<Board, Long>{
	
	public Board save(BoardDTO boardDTO);
	
	public List<BoardMapping> findByUserId(String userId);
	
	long countByUserId(String userId);
	
}
