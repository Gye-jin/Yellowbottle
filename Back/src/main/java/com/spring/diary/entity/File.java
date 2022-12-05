package com.spring.diary.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.spring.diary.dto.FileDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Builder
public class File {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "file_no", nullable = false)
	private Long no;
	
	// 조인 설정
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "diary_no")
	private Diary diary;
	
	private String originalFileName;
	private String fileName;
	private String filePath;
	
	public void updateDiary(Diary diary) {
		this.diary = diary;
	}
	
	public static FileDTO entityToDTO(File file) {
		FileDTO fileDTO = FileDTO.builder()
				 .diary(file.getDiary())
				 .originalFileName(file.getOriginalFileName())
				 .fileName(file.getFileName())
				 .filePath(file.getFilePath())
				 .build();
		return fileDTO;
	}
}
