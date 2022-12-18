package com.spring.back.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.spring.back.entity.Board;

public interface FileService {

	
	// [File 삭제]
	public void deleteFileBoard(Board board);
	// [File 생성]
	public void uploadFile(Long boardNo, List<MultipartFile> files);
	// [File 업데이트]
	public void updateFile(Long boardNo, List<MultipartFile> files);
}
