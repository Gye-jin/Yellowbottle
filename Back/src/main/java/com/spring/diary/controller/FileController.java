package com.spring.diary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.diary.service.FileService;

@RestController
public class FileController {

	@Autowired
	FileService fileService;
	
	@PostMapping("/file")
	public void insertFile(@RequestParam("file") MultipartFile file) {
//		fileService.insertFile(file);
	}
}
