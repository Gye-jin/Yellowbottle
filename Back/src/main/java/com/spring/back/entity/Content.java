package com.spring.back.entity;


import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;

import com.spring.back.content.ContentCategory;
import com.spring.back.dto.ContentDTO;
import com.spring.back.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Content {
	// Column
	// --------------------------------------------------------------------------------------------------------------------------------
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="content_no")
	private Long contentNo;
	
	private String contentTitle;
	private String contentContent;
	
	private String contentUrl;
	
	@Enumerated(EnumType.STRING)
	private ContentCategory contentCategory;
	
	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime date;
	
	private LocalDateTime sendDate;
	
	
	// DtoToEntity
	public static ContentDTO contentEntityToDTO(Content content) {
		ContentDTO contentDTO = ContentDTO.builder()
									  .contentNo(content.getContentNo())
									  .contentTitle(content.getContentTitle())
									  .contentContent(content.getContentContent())
									  .contentUrl(content.getContentUrl())
									  .contentCategory(content.getContentCategory())
									  .date(content.getDate())
									  .sendDate(content.getSendDate())
									  .build();
		return contentDTO;
	}
	
	// [ContentContent 변경]
	public void updateContent(ContentDTO contentDTO) {
		 this.contentContent = contentDTO.getContentContent();
	}
	
	
	public void updateSendDate() {
		this.sendDate = LocalDateTime.now();
	}

}
