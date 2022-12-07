package com.spring.back.service;

import com.spring.back.dto.ContentDTO;

public interface ContentService {
	
	// [컨텐츠 작성]
	public ContentDTO insertContent(ContentDTO contentDTO);

	// [(수정용)컨텐츠 가져오기]
	public ContentDTO getOldContent(ContentDTO contentDTO);

	// [컨텐츠 수정]
	public boolean updateContent(ContentDTO contentDTO);

	// [컨텐츠 삭제]
	public boolean deleteContent(ContentDTO contentDTO);


}
