package com.spring.board.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.board.common.dto.PageRequestDTO;
import com.spring.board.common.dto.PageResultDTO;
import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Board;
import com.spring.board.repository.BoardRepository;

@Service
public class BoardServiceImpl implements BoardService{
	
	
	@Autowired
	BoardRepository diaryRepo;
	
	
	@Autowired
	FileServiceImpl fileService;
	
	@Override
	public Long insertDiary(BoardDTO diaryDTO) {
	Board diary = diaryDTO.dtoToEntity(diaryDTO);
	
	
	return diaryRepo.save(diary).getNo();
	
	}

	@Override
	public BoardDTO getDiaryByDiaryNo(Long diaryNo) throws NoSuchElementException{
		
		Board diary = diaryRepo.findById(diaryNo).orElseThrow(NoSuchElementException::new);
		
		
//		Diary diary = diaryRepo.getDiaryByNo(diaryNo);		
		BoardDTO diaryDTO = diary.entityToDTO(diary);
		
		return diaryDTO;
	}
	
	@Override
	public void deleteDiary(Long diaryNo){
		
		
		fileService.deleteFileDiary(diaryNo);
		diaryRepo.deleteById(diaryNo);
		
		
	}
	
	@Override
	public void insertBatchData(List<BoardDTO> diaryList) {
		
		List<Board> entities = diaryList.stream()
				.map(diaryDTO -> diaryDTO.dtoToEntity(diaryDTO))
				.collect(Collectors.toList());
		diaryRepo.saveAll(entities);
	}
	
	@Override
	public PageResultDTO<BoardDTO, Board> getList(PageRequestDTO requestDTO) {
		Pageable pageable = requestDTO.getPageable();
		Page<Board> result = diaryRepo.findAll(pageable);
		
		Function<Board, BoardDTO> fn = (diary -> diary.entityToDTO(diary));
		
		return new PageResultDTO<BoardDTO, Board>(result, fn);
	}
	
	
	@Override
	@Transactional
	public void updateDiary(Long diaryNo, BoardDTO newdiaryDTO) {

	
	Board diary = diaryRepo.getDiaryByNo(diaryNo);
	
	diary.updateDiary(newdiaryDTO);
	

	
	}
	
}
