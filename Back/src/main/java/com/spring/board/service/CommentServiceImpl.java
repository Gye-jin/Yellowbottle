package com.spring.board.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.dto.CommentDTO;
import com.spring.board.entity.Comment;
import com.spring.board.repository.BoardRepository;
import com.spring.board.repository.CommentRepository;
import com.spring.board.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
//	@Autowired
	final CommentRepository commentRepo;
//	@Autowired
	final BoardRepository boardRepo;
//	@Autowired
	final UserRepository userRepo;
	
	// Create ------------------------------------------------------------------------------------------------------
	@Override
	public boolean insertComment(CommentDTO commentDTO) {
		// comment DTO를 Entity로 변경하기
		Comment comment = CommentDTO.commentDtoToEntity(commentDTO);
		// 빌더에서 빠져있는 board채우기
		comment.boardInComment(boardRepo.findById(commentDTO.getBoardNo())
									.orElseThrow(NoSuchElementException::new));
		// 빌더에서 빠져있는 user채우기
		comment.userInComment(userRepo.findById(commentDTO.getUserId())
									.orElseThrow(NoSuchElementException::new));
		commentRepo.save(comment);
		return true;
	}
}
