package com.spring.board.service;

import java.util.List;

import com.spring.board.tag.tag;

public interface TagService {
	
	public void insertTag(Long boardId, List<tag> tagDTOs);
	
	public void deleteTagBoard(Long boardId);
	
	
}
