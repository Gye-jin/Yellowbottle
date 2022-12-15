package com.spring.back.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

	
	// [File 삭제]
	public void deleteFileBoardNo(Long boardNo);
	// [File 생성]
	public void uploadFile(Long boardNo, List<MultipartFile> files);
}
