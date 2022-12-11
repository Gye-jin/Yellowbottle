package com.spring.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.back.dto.FileDTO;
import com.spring.back.entity.File;


@Repository
public interface FileRepository extends JpaRepository<File, Long>{
	
	// File 저장 후 반환
	public File save(FileDTO fileDTO);
	
	// BoardNo에 해당하는 모든 파일 삭제
	@Modifying
	@Query("DELETE FROM File f WHERE f.board.boardNo = :no")
	void deleteByBoardNo(@Param("no") Long boardNo);
	
	// 오류 미발생 시 삭제 예정
//	@Query("SELECT f FROM File f WHERE f.board.boardNo = :no")
//	public List<File> findFileByBoardNo(@Param("no") Long boardNo);
	
}
