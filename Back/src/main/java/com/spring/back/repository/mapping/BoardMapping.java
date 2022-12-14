package com.spring.back.repository.mapping;

import com.fasterxml.jackson.annotation.JsonIgnore;

public interface BoardMapping {
	

	// Element
	// --------------------------------------------------------------------------------------------------------------------------------
	// [BoardNo]
	Long getboardNo();
	// [FileName]
	@JsonIgnore
	String getFilesFileName();
	// [FilePath]
	@JsonIgnore
	String getFilesFilePath();
	
    default String getFileName() { 
        return getFilesFileName();
        
    }
    default String getFilePath() {
    	return getFilesFilePath();
    	
    }
	


    
}
