package com.spring.diary.dto;

import java.util.UUID;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.web.multipart.MultipartFile;

import com.spring.diary.entity.File;

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
	
}
