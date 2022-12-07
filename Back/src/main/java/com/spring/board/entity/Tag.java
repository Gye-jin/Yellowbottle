package com.spring.board.entity;


import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.spring.board.dto.BoardDTO;
import com.spring.board.dto.TagDTO;
import com.spring.board.tag.Category;

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
public class Tag {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tagNo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="board_no")
	private Board board;
	
	@Enumerated(EnumType.STRING)
	private Category tagContent;
	
	
	public static TagDTO entotyToDTO(Tag tag) {
		TagDTO tagDTO = TagDTO.builder()
							  .tagNo(tag.getTagNo())
							  .tagContent(tag.getTagContent())
							  .build();
				 
		return tagDTO;
	}

	public void updateTag(Tag newTag) {
		this.tagContent = newTag.getTagContent();
	}
	
	public void updateBoard(Board board) {
		this.board = board;
	}
	
}
