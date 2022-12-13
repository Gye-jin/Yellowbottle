package com.spring.back.repository;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.back.entity.Board;
import com.spring.back.entity.User;
import com.spring.back.repository.mapping.BoardMapping;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	
	// Board객체를 저장 후 반환
	public Board save(Board board);
	
	// 해당 user와 관련된 BoardMapping객체를 배열형태로 반환
	public ArrayList<BoardMapping> findByUser(User user);
	
	// 해당 user가 작성한 board의 개수 반환
	Long countByUser(User user);

}
