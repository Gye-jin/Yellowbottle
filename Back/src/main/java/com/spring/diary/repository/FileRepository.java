package com.spring.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.diary.entity.File;

public interface FileRepository extends JpaRepository<File, Long> {
	public File getFileByDiaryNo(Long diaryNo);
}
