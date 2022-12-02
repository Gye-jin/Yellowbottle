package com.spring.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.diary.entity.Diary;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
	
}
