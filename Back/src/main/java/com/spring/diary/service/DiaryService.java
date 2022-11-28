package com.spring.diary.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.spring.diary.common.dto.PageRequestDTO;
import com.spring.diary.common.dto.PageResultDTO;
import com.spring.diary.dto.DiaryDTO;
import com.spring.diary.entity.Diary;

public interface DiaryService {
	
	public Long insertDiary(DiaryDTO diaryDTO);
	
	public DiaryDTO getDiaryByDiaryNo(Long diaryNo) throws Exception;
	
	public void deleteDiary(Long diaryNo);
	
	public void insertBatchData(List<DiaryDTO> diaryList);
	
	public PageResultDTO<DiaryDTO, Diary> getList(PageRequestDTO requestDTO);
	
	public void updateDiary(Long diaryNo, DiaryDTO newdiaryDTO);
}
