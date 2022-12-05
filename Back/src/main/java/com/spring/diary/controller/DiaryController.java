package com.spring.diary.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.IntStream;

import javax.persistence.EntityNotFoundException;
import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.diary.common.dto.PageRequestDTO;
import com.spring.diary.common.dto.PageResultDTO;
import com.spring.diary.dto.DiaryDTO;
import com.spring.diary.entity.Diary;
import com.spring.diary.repository.DiaryRepository;
import com.spring.diary.service.DiaryService;
import com.spring.diary.service.FileService;

import lombok.extern.slf4j.Slf4j;

// 페이지 전환이 필요없기 때문에 RestController 사용
@RestController
@Slf4j
@RequestMapping(value = "/api")
@CrossOrigin(origins = {"http://localhost:3000"})
public class DiaryController {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	DiaryService diaryService;
	
//	@Autowired	// 임시 테스트로 불러온 것! 절대 이렇게 사용하면 안됨
//	DiaryRepository diaryRepo;
	
	@Autowired
	FileService fileService;
	
	@PostMapping(value = "/diary/insert")
	public void insertDiary(@ModelAttribute DiaryDTO diaryDTO, MultipartFile file) {
		logger.info("다이어리 컨트롤러 : insert request");
		
		Long diaryNo = diaryService.insertDiary(diaryDTO);
		
		if(diaryNo != null && file != null) {
			fileService.insertFile(file, diaryNo);
		}
	}
	
	@GetMapping(value = "/diary/{diaryNo}")
	public DiaryDTO getDiary(@PathVariable Long diaryNo) {
//		logger.info("다이어리 get : " + diaryNo);
		DiaryDTO diaryDTO = null;
		diaryDTO = diaryService.getDiaryByDiaryNo(diaryNo);
		return diaryDTO;
	}
	@PutMapping(value = "/diary/edit/{diaryNo}")
	public DiaryDTO updateDiary(@PathVariable Long diaryNo, @RequestBody String content) {
		return null;
	}
	
//	@GetMapping(value = "/diary/delete/{diaryNo}")
//	public boolean 
	
	// 한번에 대용량의 데이터 전달 => 벌크인설트
	@GetMapping("/batch")
	public void insertBatchData() {
		List<DiaryDTO> diaryList = new ArrayList<DiaryDTO>();
		
		IntStream.rangeClosed(501, 600).forEach(i -> {
			DiaryDTO diaryDTO = DiaryDTO.builder()
					.title("Title" + i)
					.content("content" + i)
					.build();
			diaryList.add(diaryDTO);
		});
		diaryService.insertBatchData(diaryList);
	}
	
	// 페이징 처리
	// pageable 인터페이스 => PageRequest 구현 클래스
	// of(int page, int size) page와 size는 필수사항
	@GetMapping("/page")
	@CrossOrigin(origins = {"http://localhost:3000"})
	public PageResultDTO pageTest(@RequestParam("page") int pageNo, @RequestParam("size") int size) {
		// Pageable(data.domain임포트하기)
//		Pageable pageable = PageRequest.of(0, 10);
//		System.out.println(pageable);
		
//		Page<Diary> result = diaryRepo.findAll(pageable);
//		System.out.println(result);
		
		// 총 페이지 수
//		System.out.println("총 페이지 수 : "+result.getTotalPages());
		
		// 총 요소의 개수
//		System.out.println("총 요소의 개수 : "+result.getTotalElements());
		
		// 현재 페이지 번호 -> 0부터 시작
//		System.out.println("현재 페이지 번호 : "+result.getNumber());
		
		// 페이지당 데이터 개수
//		System.out.println("페이지당 데이터 개수 : "+result.getSize());
		
		// 이전 or 다음 페이지 존재 여부
//		System.out.println(result.hasNext());
//		System.out.println(result.hasPrevious());
		
		// 모든 데이터 출력
//		for(Diary diary : result.getContent()) {
//			System.out.println(diary);
//		}
		
		// 정렬
//		Sort sort2 = Sort.by("no").descending();
//		Pageable pageable2 = PageRequest.of(0, 10, sort2);
//		Page<Diary> result2 = diaryRepo.findAll(pageable2);
//		System.out.println(result2);
//		
//		result2.forEach(diary -> {
//			System.out.println(diary);
//		});
		
		// RequestDTO
//		PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
//													  .page(pageNo)
//													  .size(size)
//													  .build();
//		System.out.println(pageRequestDTO.getPageable());
//		Page<Diary> diaryEntities = diaryRepo.findAll(pageRequestDTO.getPageable());
//		diaryEntities.forEach(diary -> {
//			System.out.println(diary);
//		});
		
		// 여기서부턴 레이어를 지키며 실습 진행해보자!
		PageRequestDTO requestDTO2 = PageRequestDTO.builder()
												   .page(pageNo)
												   .size(size)
												   .build();
		PageResultDTO pageResultDTO2 = diaryService.getList(requestDTO2);
		System.out.println(pageResultDTO2);
		return pageResultDTO2;
	}
	
//	@ExceptionHandler(NoSuchElementException.class)
//	public ResponseEntity<String> handlerNoSuchElementException(NoSuchElementException e) {
////		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 요청값은 존재하지 않습니다.");
//		return ResponseEntity.status(404).body("해당 요청값은 존재하지 않습니다.");
//	}
	
//	@ExceptionHandler(EntityNotFoundException.class)
//	public ResponseEntity<String> handlerEntityNotFoundException(EntityNotFoundException e) {
//		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 요청값은 존재하지 않습니다.");
////		return ResponseEntity.status(404).body("해당 요청값은 존재하지 않습니다.");
//	}
	
}
