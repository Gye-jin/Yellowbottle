package com.spring.board.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.entity.Board;
import com.spring.board.entity.Tag;
import com.spring.board.repository.BoardRepository;
import com.spring.board.repository.TagRepository;
import com.spring.board.tag.tag;

@Service
public class TagServiceImpl implements TagService{
	
	@Autowired
	BoardRepository boardRepo;
	
	@Autowired
	TagRepository tagRepo;
	
	@Override
	public void insertTag(Long boardId, List<tag> tags) {
		for (tag tag : tags) {
			Tag tagentity = Tag.builder()
					 .tagContent(tag)
					 .build();
			
			Board board = boardRepo.getById(boardId);
			
			tagentity.updateBoard(board);
			
			tagRepo.save(tagentity);
		
		}
	}
		
	@Override
	@Transactional
	public void deleteTagBoard(Long boardId) {
		tagRepo.deleteByBoardNo(boardId);
	}
	
	
}
