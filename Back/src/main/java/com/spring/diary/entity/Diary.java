package com.spring.diary.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.spring.diary.dto.DiaryDTO;

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
// entity의 값이 변경되는지 지켜보는 => @createdDate와 lastModifiedDate를 사용하기 위해서 필요함
@EntityListeners(AuditingEntityListener.class)
public class Diary {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "diary_no")
	private Long no;
	private String title;
	private String content;
	
	// updatable = false => 절대 수정 불가하게 하는 조건
	// @CreatedDate => jpa에서 처음 만들 때 사용되는 것이라는걸
	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime writtenDate;
	// @LastModifiedDate => jpa가 수정될 때 사용된다는 것을
	
	@LastModifiedDate
	private LocalDateTime modifiedDate;
	
	public static DiaryDTO entityToDTO(Diary diary) {
		DiaryDTO diaryDTO = DiaryDTO.builder()
									.no(diary.getNo())
									.title(diary.getContent())
									.content(diary.getContent())
									.createDate(diary.getWrittenDate())
									.modifiedDate(diary.getModifiedDate())
									.build();
		return diaryDTO;
	}
}
