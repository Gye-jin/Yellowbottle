package com.spring.back.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.back.dto.CommentDTO;
import com.spring.back.dto.SessionDTO;
import com.spring.back.entity.Board;
import com.spring.back.entity.Comment;
import com.spring.back.entity.Session;
import com.spring.back.entity.User;
import com.spring.back.repository.BoardRepository;
import com.spring.back.repository.CommentRepository;
import com.spring.back.repository.SessionRepository;
import com.spring.back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Repository]
	@Autowired
	CommentRepository commentRepo;
	@Autowired
	BoardRepository boardRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	SessionRepository sessionRepo;

	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [댓글 작성]
	@Override
	public CommentDTO insertComment(SessionDTO sessionDTO, CommentDTO commentDTO) {
		Session session = sessionRepo.findBySessionId(sessionDTO.getSessionId());

		Comment comment = CommentDTO.commentDtoToEntity(commentDTO);

		// 빌더에서 빠져있는 board채우기
		comment.boardInComment(boardRepo.findById(commentDTO.getBoardNo()).orElseThrow(NoSuchElementException::new));
		// 빌더에서 빠져있는 user채우기
		comment.userInComment(
				userRepo.findById(session.getUser().getUserId()).orElseThrow(NoSuchElementException::new));

		Long commentNo = commentRepo.save(comment).getCommentNo();

		Comment newComment = commentRepo.findById(commentNo).orElseThrow(NoSuchElementException::new);
		CommentDTO newCommentDTO = Comment.trueEntityToDTO(newComment);
		return newCommentDTO;
	}

	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [댓글 가져오기]
	@Override
	public CommentDTO getComment(SessionDTO sessionDTO, CommentDTO commentDTO) {

		Session session = sessionRepo.findBySessionId(sessionDTO.getSessionId());
		Comment comment = commentRepo.findById(commentDTO.getCommentNo()).orElseThrow(NoSuchElementException::new);

		if (session.getUser().equals(comment.getUser())) {
			CommentDTO commentDT = Comment.trueEntityToDTO(comment);
			return commentDT;
		} else {
			CommentDTO commentDT = Comment.falseEntityToDTO(comment);
			return commentDT;
		}

	}

	// [(수정용)댓글 가져오기]
	@Override
	public CommentDTO getOldComment(CommentDTO commentDTO) {
		Long commentNo = commentDTO.getCommentNo();

		Comment comment = commentRepo.findById(commentNo).orElseThrow(NoSuchElementException::new);

		if (commentDTO.getUserId().equals(comment.getUser().getUserId())) {
			CommentDTO oldCommentDTO = Comment.falseEntityToDTO(comment);
			return oldCommentDTO;
		}
		return null;
	}

	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [댓글 수정]
	@Override
	public boolean updateComment(SessionDTO sessionDTO, CommentDTO commentDTO) {
		// userId 가져오기
		String userId = sessionRepo.findBySessionId(sessionDTO.getSessionId()).getUser().getUserId();
		// commentNo를 활용하여 Comment Entity 가져오기
		Comment comment = commentRepo.findById(commentDTO.getCommentNo()).orElseThrow(NoSuchElementException::new);
		String newCommentContent = commentDTO.getCommentContent();
		if (userId.equals(comment.getUser().getUserId())) {
			comment.updateCommentContentInEntity(newCommentContent);
			commentRepo.save(comment);
			return true;
		}
		return false;
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [특정 댓글 삭제]
	public boolean deleteComment(SessionDTO sessionDTO, CommentDTO commentDTO) {
		Long commentNo = commentDTO.getCommentNo();
		String userId = sessionRepo.findBySessionId(sessionDTO.getSessionId()).getUser().getUserId();

		Comment comment = commentRepo.findById(commentNo).orElseThrow(NoSuchElementException::new);

		if (userId.equals(comment.getUser().getUserId())) {
			commentRepo.deleteById(comment.getCommentNo());
			return true;
		}
		return false;
	}

	// [특정 게시글의 모든 댓글 삭제]
	public void deleteAllComment(Long boardNo) {
		commentRepo.deleteByboardNo(boardNo);
	}

}
