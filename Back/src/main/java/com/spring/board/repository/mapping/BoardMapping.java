package com.spring.board.repository.mapping;

import java.util.List;


public interface BoardMapping {
	Long getNo();
	String getUserId();
	List<FileName> getFiles();
	
	interface FileName {
		String getFileName();
	}
}
