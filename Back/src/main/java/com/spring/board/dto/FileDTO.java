package com.spring.board.dto;

import com.spring.board.entity.File;

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
						.originalFileName(fileDTO.getOriginalFileNAME())
						.fileName(fileDTO.getFileName())
						.filePath(fileDTO.getFilePath())
						.build();
		return file;
	}
	
	public interface FileDTOMapping {
	    String getFileName();
	}
}
