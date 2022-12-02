package com.spring.board.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;


public interface FileService {

	public void insertFile(Long boardId,List<MultipartFile> file);
	
	public void deleteFile(Long fileNo);
	
	
	public void deleteFileBoard(Long boardId);
}
