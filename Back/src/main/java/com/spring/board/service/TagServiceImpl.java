package com.spring.board.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.entity.Board;
import com.spring.board.entity.Tag;
import com.spring.board.repository.BoardRepository;
import com.spring.board.repository.TagRepository;
import com.spring.board.tag.Category;

@Service
public class TagServiceImpl implements TagService{
	// Repository 연결
	@Autowired
	BoardRepository boardRepo;
	@Autowired
	TagRepository tagRepo;
	
	// 태그 DB에 삽입하기
	@Override
	public void insertTag(Long boardId, List<Category> tags) {
		// tags객체 해체 후 tag하나하나 DB에 삽입
		for (Category tag : tags) {
			Tag tagentity = Tag.builder()
					 .tagContent(tag)
					 .build();
			// boardId를 활용하여 board객체 가져오기
			Board board = boardRepo.findById(boardId).orElseThrow(NoSuchElementException::new);
			// 가져온 board객체 tag에 삽입
			tagentity.updateBoard(board);
			// 완성한 tag DB에 삽입
			tagRepo.save(tagentity);
		}
	}
		
	@Override
	@Transactional
	public void deleteTagBoard(Long boardId) {
		tagRepo.deleteTagByBoardNo(boardId);
	}
	
	
}
