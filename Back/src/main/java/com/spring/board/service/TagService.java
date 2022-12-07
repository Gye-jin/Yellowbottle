package com.spring.board.service;

import java.util.List;

import com.spring.board.tag.Category;

public interface TagService {
	
	public void insertTag(Long boardId, List<Category> tagDTOs);
	
	public void deleteTagBoard(Long boardId);
	
	
}
