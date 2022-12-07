package com.spring.back.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.back.dto.ContentDTO;
import com.spring.back.entity.Content;
import com.spring.back.repository.ContentRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Repository]
	@Autowired
	ContentRepository contentRepo;


	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [컨텐츠 작성]
	@Override
	public ContentDTO insertContent(ContentDTO contentDTO) {
		Content content = ContentDTO.contentDtoToEntity(contentDTO);

		Long contentNo = contentRepo.save(content).getContentNo();

		Content newContent = contentRepo.findById(contentNo).orElseThrow(NoSuchElementException::new);
		ContentDTO newContentDTO = Content.contentEntityToDTO(newContent);
		return newContentDTO;
	}

	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [(수정용)컨텐츠 가져오기]
	@Override
	public ContentDTO getOldContent(ContentDTO contentDTO) {
		Long contentNo = contentDTO.getContentNo();

		Content content = contentRepo.findById(contentNo).orElseThrow(NoSuchElementException::new);

		ContentDTO oldContentDTO = Content.contentEntityToDTO(content);
		return oldContentDTO;

	}

	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [컨텐츠 수정]
	@Override
	public boolean updateContent(ContentDTO contentDTO) {
		Content content = ContentDTO.contentDtoToEntity(contentDTO);

		
		contentRepo.save(content);
		return true;
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [특정 컨텐츠 삭제]
	public boolean deleteContent(ContentDTO contentDTO) {
		Long contentNo = contentDTO.getContentNo();

		Content content = contentRepo.findById(contentNo).orElseThrow(NoSuchElementException::new);

		
		contentRepo.deleteById(content.getContentNo());
		return true;
	
	}
	

}
