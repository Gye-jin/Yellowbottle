package com.spring.board.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mapping.AccessOptions.GetOptions;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.board.dto.BoardDTO;
import com.spring.board.dto.FileDTO;
import com.spring.board.service.FileServiceImpl;

@RestController
public class FileController {
	
	@Autowired
	FileServiceImpl fileservice;
	
	public void insertFile(@RequestParam("boardNo")Long boardNo, List<MultipartFile> file) {

		fileservice.insertFile(boardNo, file);
	

	}
	
	public void DeleteFile(Long fileno) {
		fileservice.deleteFile(fileno);
	}
	
	
}
