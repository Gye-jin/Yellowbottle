package com.spring.diary.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.diary.common.dto.PageRequestDTO;
import com.spring.diary.common.dto.PageResultDTO;
import com.spring.diary.dto.DiaryDTO;
import com.spring.diary.entity.Diary;
import com.spring.diary.repository.DiaryRepository;

@Service
public class DiaryServiceImpl implements DiaryService{
	
	
	@Autowired
	DiaryRepository diaryRepo;
	
	
	@Autowired
	FileServiceImpl fileService;
	
	@Override
	public Long insertDiary(DiaryDTO diaryDTO) {
	Diary diary = diaryDTO.dtoToEntity(diaryDTO);
	
	
	return diaryRepo.save(diary).getNo();
	
	}

	@Override
	public DiaryDTO getDiaryByDiaryNo(Long diaryNo) throws NoSuchElementException{
		
		Diary diary = diaryRepo.findById(diaryNo).orElseThrow(NoSuchElementException::new);
		
		
//		Diary diary = diaryRepo.getDiaryByNo(diaryNo);		
		DiaryDTO diaryDTO = diary.entityToDTO(diary);
		
		return diaryDTO;
	}
	
	@Override
	public void deleteDiary(Long diaryNo){
		
		
		fileService.deleteFileDiary(diaryNo);
		diaryRepo.deleteById(diaryNo);
		
		
	}
	
	@Override
	public void insertBatchData(List<DiaryDTO> diaryList) {
		
		List<Diary> entities = diaryList.stream()
				.map(diaryDTO -> diaryDTO.dtoToEntity(diaryDTO))
				.collect(Collectors.toList());
		diaryRepo.saveAll(entities);
	}
	
	@Override
	public PageResultDTO<DiaryDTO, Diary> getList(PageRequestDTO requestDTO) {
		Pageable pageable = requestDTO.getPageable();
		Page<Diary> result = diaryRepo.findAll(pageable);
		
		Function<Diary, DiaryDTO> fn = (diary -> diary.entityToDTO(diary));
		
		return new PageResultDTO<DiaryDTO, Diary>(result, fn);
	}
	
	
	@Override
	@Transactional
	public void updateDiary(Long diaryNo, DiaryDTO newdiaryDTO) {

	
	Diary diary = diaryRepo.getDiaryByNo(diaryNo);
	
	diary.updateDiary(newdiaryDTO);
	

	
	}
	
}
