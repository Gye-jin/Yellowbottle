package com.spring.diary.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.diary.dto.FileDTO;
import com.spring.diary.entity.Diary;
import com.spring.diary.entity.File;
import com.spring.diary.repository.DiaryRepository;
import com.spring.diary.repository.FileRepository;

@Service
public class FileService {
	@Autowired
	FileRepository fileRepo;
	
	@Autowired
	DiaryRepository diaryRepo;
	
	public void insertFile(MultipartFile file, Long diaryNo) {
		FileDTO fileDTO = FileDTO.builder()
								 .originalFileName(file.getOriginalFilename())
								 .fileName(UUID.randomUUID()+"_"+file.getOriginalFilename())
								 .filePath(System.getProperty("user.dir")+"\\files")
								 .build();
		
		// DTO => Entity
		File fileEntity = fileDTO.dtoToEntity(fileDTO);
		
		Diary diary = diaryRepo.getById(diaryNo);
		
		fileEntity.updateDiary(diary);
		fileRepo.save(fileEntity);
		
	}
	
	// 특정 file 호출하기
	// diaryNo가 중복될 경우 문제 발생
	public FileDTO getFileByDiaryNo(Long diaryNo) {
		File file = fileRepo.getFileByDiaryNo(diaryNo);
		
		FileDTO fileDTO = File.entityToDTO(file);
		
		return fileDTO;
	}
	
	// 위에서 발생한 문제를 해결하기
	// diary
//	public List<FileDTO> findAllByDiaryNo(Long diaryNo) {
//		List<FileDTO> = fileRepo.findAllByDiaryNo(diaryNo);
//	}
}
