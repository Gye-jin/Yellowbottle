package com.spring.back.dto;

import com.spring.back.content.ContentCategory;
import com.spring.back.entity.Content;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ContentDTO {
	private Long contentNo;
	private String contentTitle;
	private String contentContent;
	private String contentUrl;
	
	private ContentCategory contentCategory;
	
	
    //여기부터
	// content객체 DTO에서 entity로 변경
	public static Content contentDtoToEntity(ContentDTO contentDTO) {
		Content content = Content.builder()
								 .contentNo(contentDTO.getContentNo())
								 .contentTitle(contentDTO.getContentTitle())							 
								 .contentContent(contentDTO.getContentContent())
								 .contentUrl(contentDTO.getContentUrl())
								 .contentCategory(contentDTO.getContentCategory())
								 .build();
		return content;
	}
	

}
