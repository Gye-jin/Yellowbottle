package com.spring.diary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.diary.dto.FileDTO;
import com.spring.diary.entity.Diary;
import com.spring.diary.entity.File;


@Repository
public interface FileRepository extends JpaRepository<File, Long>{
	
	public File save(FileDTO fileDTO);
	
	@Transactional
	void deleteByDiaryNo(Long no);
	
	public List<File> getFileByDiaryNo(Long no);
}
