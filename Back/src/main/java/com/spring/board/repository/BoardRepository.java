package com.spring.board.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Board;


@Repository
public interface BoardRepository extends JpaRepository<Board, Long>{
	
	public Board save(BoardDTO diaryDTO);
	
	
	
	
	
}
