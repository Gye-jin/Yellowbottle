package com.spring.diary.dto;

import java.time.LocalDateTime;

import com.spring.diary.entity.Diary;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DiaryDTO {
	private Long no;
	private String title;
	private String content;
	private LocalDateTime createDate;
	private LocalDateTime modifiedDate;
	
	public static Diary dtoToEntity(DiaryDTO diaryDTO) {
		Diary diary = Diary.builder()
								.title(diaryDTO.getTitle())
								.content(diaryDTO.getContent())
								.build();
		return diary;
	}
}
