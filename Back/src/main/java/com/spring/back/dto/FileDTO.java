package com.spring.back.dto;

import com.spring.back.entity.File;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FileDTO {
	private String originalFileNAME;
	private String fileName;
	private String filePath;
	

	
	// DTO -> Entity
	public static File dtoToEntity(FileDTO fileDTO){
		File file = File.builder()
						.fileName(fileDTO.getFileName())
						.filePath(fileDTO.getFilePath())
						.originalFileName(fileDTO.getOriginalFileNAME())
						.build();
		return file;
	}
	
	public interface FileDTOMapping {
	    String getFileName();
	}
}
