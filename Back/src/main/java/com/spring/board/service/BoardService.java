package com.spring.board.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.spring.board.common.dto.PageRequestDTO;
import com.spring.board.common.dto.PageResultDTO;
import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Board;

public interface BoardService {
	
	public Long insertDiary(BoardDTO diaryDTO);
	
	public BoardDTO getDiaryByDiaryNo(Long diaryNo) throws Exception;
	
	public void deleteDiary(Long diaryNo);
	
	public void insertBatchData(List<BoardDTO> diaryList);
	
	public PageResultDTO<BoardDTO, Board> getList(PageRequestDTO requestDTO);
	
	public void updateDiary(Long diaryNo, BoardDTO newdiaryDTO);
}
