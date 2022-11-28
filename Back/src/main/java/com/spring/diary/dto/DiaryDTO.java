package com.spring.diary.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.LastModifiedDate;

import com.spring.diary.entity.Diary;
import com.spring.diary.entity.File;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DiaryDTO {
	
	private Long no;
	private String title;
	private String content;
	private LocalDateTime createDate;
	private LocalDateTime modifiedDate;
	
	@OneToMany(fetch = FetchType.LAZY)
	List<FileDTO> fileDTOs = new ArrayList<FileDTO>();
	


	
	// dto -> entity
	public static Diary dtoToEntity(DiaryDTO diaryDTO){
		Diary diary = Diary.builder()
						.title(diaryDTO.getTitle())
						.content(diaryDTO.getContent())
//						.files(diaryDTO.getFileDTOs().stream()
//								  .map(fileDTO -> fileDTO.dtoToEntity(fileDTO))
//							      .collect(Collectors.toList()))
						.build();
		return diary;
	}
	

}
