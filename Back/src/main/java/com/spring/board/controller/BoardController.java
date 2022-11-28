package com.spring.board.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.IntStream;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.board.common.dto.PageRequestDTO;
import com.spring.board.common.dto.PageResultDTO;
import com.spring.board.dto.BoardDTO;
import com.spring.board.entity.Board;
import com.spring.board.repository.BoardRepository;
import com.spring.board.service.BoardServiceImpl;
import com.spring.board.service.FileServiceImpl;

import lombok.extern.slf4j.Slf4j;






@Slf4j
@RestController
@RequestMapping(value="/api", produces = "application/json")
@CrossOrigin(origins = {"http://localhost:3000"})
public class BoardController {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	BoardServiceImpl diaryservice;
	
	@Autowired
	BoardRepository diaryRepo;
	
	@Autowired
	FileServiceImpl fileService;

	@PostMapping(value ="/diary")
	public void createDiary(@ModelAttribute BoardDTO diaryDTO, @RequestParam("file") List<MultipartFile> file) {
		logger.info("다이어리 컨트롤러 : insertrquest");
//		diaryservice.insertDiary(diaryDTO);
		Long diaryId = diaryservice.insertDiary(diaryDTO);
		
		if(diaryId !=null && file !=null) {
			fileService.insertFile(diaryId, file);
		}	
	}
		
	
	@GetMapping("/diary/{diaryNo}")
	public BoardDTO getDiary(@PathVariable Long diaryNo) {
	
		BoardDTO diaryDTO = null;

			diaryDTO = diaryservice.getDiaryByDiaryNo(diaryNo);

		
		
		return diaryDTO;

	}
	
	@DeleteMapping("/diary/{diaryNo}")
	public void deleteDiary(@PathVariable Long diaryNo) {
		
		diaryservice.deleteDiary(diaryNo);
		
	}
	
	@GetMapping("/batch")
	public void insertBatchData() {
		List<BoardDTO> diaryList = new ArrayList<BoardDTO>();
		
		IntStream.rangeClosed(301, 500).forEach(i -> {
			BoardDTO diaryDTO = BoardDTO.builder()
										.title("Title "+i)
										.content("Content "+i)
										.build();
			diaryList.add(diaryDTO);
			
		});
		diaryservice.insertBatchData(diaryList);
		
	}
	
	@GetMapping(value ="/diaryupdate/{diaryNo}")
	public void updateDiary(@PathVariable Long diaryNo, @ModelAttribute BoardDTO newdiaryDTO) {
		logger.info("다이어리 컨트롤러 : updaterequest");
//		diaryservice.insertDiary(diaryDTO);
		diaryservice.updateDiary(diaryNo, newdiaryDTO);
	}
	
	
	
	
	// 페이징 처리
	// pageable 인터페이스 -> pagerequest 구현 클래스
	// of(int page, int size)
	@GetMapping("/page")
	public PageResultDTO pageTest(@RequestParam("page") int pageNo,@RequestParam("size") int size) {
//		Pageable pageable = PageRequest.of(1, 10);
//		System.out.println(pageable);
		
//	Page<Diary> result = diaryRepo.findAll(pageable);
//	System.out.println(result);
	
	// 총 페이지 수
//	System.out.println(result.getTotalPages());
	
	// 총 게시물 갯수(요소)
//	System.out.println(result.getTotalElements());
	
	// 현재 페이지 번호 : 0부터 시작
//	System.out.println(result.getNumber());
	
	// 페이지 당 데이터 갯수
//	System.out.println(result.getSize());
	
	
	// 이전, 다음 페이지 존재 여부
//	System.out.println(result.hasNext());
//	System.out.println(result.hasPrevious());
	
	
	// 모든 데이터 출력
//	for(Diary diary : result.getContent()) {
//		System.out.println(diary);
//	}
	
	// 정렬
//	Sort sort2 = Sort.by("no").descending();
//	Pageable pageable2 = PageRequest.of(0, 10,sort2);
//	Page<Diary> result2 = diaryRepo.findAll(pageable2);
//	System.out.println(result2);
//	result2.forEach(diary -> {
//		System.out.println(diary);
//	});
	
	// RequestDTO
//	PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
//												 .page(pageNo)
//												 .size(size)
//												 .build();
//	
//	System.out.println(pageRequestDTO.getPageable());
//	Page<Diary> diaryEntity = diaryRepo.findAll(pageRequestDTO.getPageable());
//	diaryEntity.forEach(diary ->{
//	System.out.println(diary);
//	});
		
	PageRequestDTO requestDTO2 =  PageRequestDTO.builder()
												.page(pageNo)
												.size(size)
												.build();
	PageResultDTO pageResultDTO2 = diaryservice.getList(requestDTO2);	
	return pageResultDTO2;
	
	

	}
		


}
