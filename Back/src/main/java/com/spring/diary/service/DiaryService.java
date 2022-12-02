package com.spring.diary.service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MultipartFile;

import com.spring.diary.common.dto.PageRequestDTO;
import com.spring.diary.common.dto.PageResultDTO;
import com.spring.diary.dto.DiaryDTO;
import com.spring.diary.entity.Diary;
import com.spring.diary.repository.DiaryRepository;
import com.spring.diary.repository.FileRepository;

@Service
public class DiaryService {
	// diaryRepository 연결
	@Autowired
	DiaryRepository diaryRepo;
	
	// fileRepository 연결
	@Autowired
	FileService fileService;
	
	// diary 추가하기
	public Long insertDiary(DiaryDTO diaryDTO) {
		Diary diary = DiaryDTO.dtoToEntity(diaryDTO);
		Long diaryNo = diaryRepo.save(diary).getNo();
		
		return diaryNo;
	}
	

	public DiaryDTO getDiaryByDiaryNo(Long diaryNo) throws NoSuchElementException {
		
		Diary diary = diaryRepo.findById(diaryNo).orElseThrow(NoSuchElementException::new);
		
//		Diary diary = diaryRepo.getById(diaryNo);
		DiaryDTO diaryDTO = Diary.entityToDTO(diary);
		return diaryDTO;	
	}
	
	public DiaryDTO updateDiaryByDiaryNo(Long diaryNo, String content) {
		return null;
	}

	public void insertBatchData(List<DiaryDTO> diaryList) {
		
		List<Diary> entities = diaryList.stream()
										.map(diaryDTO -> diaryDTO.dtoToEntity(diaryDTO))
										.collect(Collectors.toList());
		diaryRepo.saveAll(entities);
	}

	public PageResultDTO<DiaryDTO, Diary> getList(PageRequestDTO requestDTO) {
		Pageable pageable = requestDTO.getPageable();
		
		Page<Diary> result = diaryRepo.findAll(pageable);
		
		Function<Diary, DiaryDTO> fn = (diary -> diary.entityToDTO(diary));
		return new PageResultDTO<DiaryDTO, Diary>(result, fn);
	}
	
//	public boolean deleteDiaryById(Long diaryNo) {
//		boolean checkDelete = diaryRepo.
//		return true;
//	}

}
