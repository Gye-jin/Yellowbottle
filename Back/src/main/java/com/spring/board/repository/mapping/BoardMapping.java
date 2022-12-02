package com.spring.board.repository.mapping;

import java.util.List;


public interface BoardMapping {
	Long getNo();
	String getUserId();
//	List<File> getFiles();
	List<FileName> getFiles();
	
	interface FileName {
		String getFileName();
	}
}
