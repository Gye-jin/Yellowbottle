package com.spring.board.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;


public interface FileService {

	public void insertFile(Long diaryId,List<MultipartFile> file);
	
	public void deleteFile(Long fileNo);
	
	public void updateFile(Long diaryId, List<MultipartFile> files);
	
	public void deleteFileDiary(Long diaryId);
}
