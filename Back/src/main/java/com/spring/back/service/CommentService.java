package com.spring.back.service;

import com.spring.back.dto.CommentDTO;
import com.spring.back.dto.SessionDTO;

public interface CommentService {

	// [댓글 작성]
	public CommentDTO insertComment(SessionDTO sessionDTO, CommentDTO commentDTO);

	// [(수정용)댓글 가져오기]
	public CommentDTO getOldComment(CommentDTO commentDTO);

	// [댓글 수정]
	public boolean updateComment(CommentDTO commentDTO);

	// [특정 댓글 삭제]
	public boolean deleteComment(CommentDTO commentDTO);

}
