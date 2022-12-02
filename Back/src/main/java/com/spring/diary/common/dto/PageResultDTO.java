package com.spring.diary.common.dto;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.data.domain.Page;

import com.spring.diary.entity.Diary;

import lombok.Builder;
import lombok.Data;

@Data
public class PageResultDTO<DTO, EN> {
	// DTO 리스트
	private List<DTO> dtoList;
	
	// 총 페이지 번호
	private int totalPage;
	// 현제 페이지 번호
	private int page;
	// 페이지 목록 개수
	private int size;
	// 시작페이지와 종료페이지
	private int start, end;
	// 이전, 다음
	private boolean prev, next;
	// 페이지 출력 개수
	private List<Integer> pageList;
	
	public PageResultDTO(Page<EN> result, Function<EN, DTO> fn) {
		this.dtoList = result.stream()
							 .map(fn)
							 .collect(Collectors.toList());
		this.totalPage = result.getTotalPages();
		
		// 우리가 볼 때엔 1부터 시작하나 기능적으로는 0부터 시작하기 때문에 +1
		this.page = result.getPageable().getPageNumber() +1;
		this.size = result.getPageable().getPageSize();
		
		int tempEnd = (int)(Math.ceil(page/10.0))*10;
		this.start = tempEnd-9;
		
		this.prev = start > 1;
		this.end = totalPage > tempEnd ? tempEnd:totalPage;
		this.next = totalPage > tempEnd;
		this.pageList = IntStream.rangeClosed(this.start, this.end)
											  .boxed()
											  .collect(Collectors.toList());
	}
	
}
