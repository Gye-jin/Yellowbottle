package com.spring.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.board.dto.FileDTO;
import com.spring.board.entity.Board;
import com.spring.board.entity.File;


@Repository
public interface FileRepository extends JpaRepository<File, Long>{
	
	public File save(FileDTO fileDTO);
	
	@Transactional
	void deleteByBoardNo(Long no);
	
	public List<File> getFileByBoardNo(Long no);
}
