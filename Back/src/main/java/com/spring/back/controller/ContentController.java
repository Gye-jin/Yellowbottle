package com.spring.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back.dto.ContentDTO;
import com.spring.back.service.ContentServiceImpl;


@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = { "http://localhost:3000" })
public class ContentController {
	
	@Autowired
	ContentServiceImpl contentService;
	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [컨텐츠 작성]
	@PostMapping(value = "/insertContent")
	public ContentDTO insertContent(@RequestBody ContentDTO contentDTO) {
		return contentService.insertContent(contentDTO);
	}
	
	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [수정할 컨텐츠 불러오기]
	@PostMapping(value = "/getUpdateContent")
	public ContentDTO getUpdateContent(@RequestBody ContentDTO contentDTO) {
		return contentService.getOldContent(contentDTO);
	}
	
	// [변경한 내용을 컨텐츠에 적용]
	@PostMapping(value = "/updateContent")
	public boolean updateContent(@RequestBody ContentDTO contentDTO) {
		return contentService.updateContent(contentDTO);
	}
	
	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [컨텐츠 삭제]
	@PostMapping(value = "/deleteContent")
	public boolean deleteContent(@RequestBody ContentDTO contentDTO) {
		return contentService.deleteContent(contentDTO);
	}

}
