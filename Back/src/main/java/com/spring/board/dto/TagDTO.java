package com.spring.board.dto;

import com.spring.board.entity.Tag;
import com.spring.board.tag.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TagDTO {
	private Long tagNo;
	private Category tagContent;
	
	
	public static Tag dtoToEntity(TagDTO tagDTO){
		Tag tag = Tag.builder()
					 .tagContent(tagDTO.getTagContent())
					 .build();
		return tag;
	}
	
}
