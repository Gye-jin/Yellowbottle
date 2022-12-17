package com.spring.back.service;

import java.util.List;

import com.spring.back.dto.ContentDTO;

public interface ContentService {
	
	// [컨텐츠 작성]
	public ContentDTO insertContent(ContentDTO contentDTO);

	// [컨텐츠 가져오기]
	public ContentDTO getContent(ContentDTO contentDTO);

	// [컨텐츠 수정]
	public boolean updateContent(ContentDTO contentDTO);

	// [컨텐츠 삭제]
	public boolean deleteContent(ContentDTO contentDTO);
	
	// [카테고리에 해당하는 컨텐츠들 불러오기]
	public List<ContentDTO> getByCategory(ContentDTO contentDTO);
	
	// [보낸 메일 확인 (카테고리 별로)]
	public List<ContentDTO> getBySendMail(ContentDTO contentDTO);
}
