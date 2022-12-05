package com.spring.diary.dto;

import com.spring.diary.entity.Diary;
import com.spring.diary.entity.File;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FileDTO {
	private Diary diary;
	private String originalFileName;
	private String fileName;
	private String filePath;
	
	public static File dtoToEntity(FileDTO fileDTO) {
		File file = File.builder()
						.diary(fileDTO.getDiary())
						.originalFileName(fileDTO.getOriginalFileName())
						.fileName(fileDTO.getFileName())
						.filePath(fileDTO.getFilePath())
						.build();
		return file;
	}
}
