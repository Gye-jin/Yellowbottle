package com.spring.board.common.dto;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
public class PageRequestDTO {
	// 화면에서 전달되는 page, size
	private int page;
	private int size;

	public PageRequestDTO() {
		this.page=1;
		this.size=10;
	}
	
	public Pageable getPageable() {
		return PageRequest.of(page - 1, size);
	}
	
}
