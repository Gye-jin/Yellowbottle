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
import org.springframework.data.annotation.LastModifiedDate;

import com.spring.back.category.ContentCategory;
import com.spring.back.dto.BoardDTO;
import com.spring.back.dto.ContentDTO;

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
	
	
	// DtoToEntity
	public static ContentDTO contentEntityToDTO(Content content) {
		ContentDTO contentDTO = ContentDTO.builder()
									  .contentNo(content.getContentNo())
									  .contentTitle(content.getContentTitle())
									  .contentContent(content.getContentContent())
									  .contentUrl(content.getContentUrl())
									  .contentCategory(content.getContentCategory())
									  .build();
		return contentDTO;
	}
	
	// [ContentContent 변경]
	public void updateContent(ContentDTO contentDTO) {
		 this.contentContent = contentDTO.getContentContent();
	}
	
	


}
