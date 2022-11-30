package com.spring.board.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.multipart.MultipartFile;

import com.spring.board.dto.BoardDTO;
import com.spring.board.dto.FileDTO;

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
@EntityListeners(AuditingEntityListener.class)
public class Board {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="diary_no")
	private Long no;
	
	private String title;
	
	private String content;
	
	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime writtenDate;
	
	@LastModifiedDate
	private LocalDateTime modifiedDate;
	
	@OneToMany(mappedBy = "diary")
	List<File> files = new ArrayList<File>();
	
	
	// entity to dto
	public static BoardDTO entityToDTO(Board diary) {

		
		
		BoardDTO diaryDTO = BoardDTO.builder()
								.no(diary.getNo())
								.title(diary.getTitle())
								.content(diary.getContent())
								.createDate(diary.getWrittenDate())
								.modifiedDate(diary.getModifiedDate())
								.fileDTOs(diary.getFiles().stream()
											  .map(file -> file.entotyToDTO(file))
										      .collect(Collectors.toList()))
								.build();
		
		return diaryDTO;
	
}
	
	public void updateDiary(BoardDTO diaryDTO) {
		this.title = diaryDTO.getTitle();
		this.content=diaryDTO.getContent();
	}
}
