package com.spring.board.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.board.dto.BoardDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = {"files", "tags", "comments"})
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Board {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="board_no")
	private Long boardNo;
	
	private String userId;
	
	private String boardContent;
	
	private Long likeCount;
	
	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime writtenDate;
	
	@LastModifiedDate
	private LocalDateTime modifiedDate;
	
	private Long viewCount;
	
	@JsonIgnore
	@OneToMany(mappedBy = "board")
//	추후 : @BatchSize 전략 사용
	List<File> files = new ArrayList<File>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "board")
//	추후 : @Query 사용
	List<Tag> tags = new ArrayList<Tag>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "board")
	List<Comment> comments = new ArrayList<Comment>();
	
	public static BoardDTO boardEntitytoDTO (Board board) {
		BoardDTO boardDTO = BoardDTO.builder()
									.boardNo(board.getBoardNo())
									.userId(board.getUserId())
									.boardContent(board.getBoardContent())
									.likeCount(board.getLikeCount())
									.createDate(board.getWrittenDate())
									.modifiedDate(board.getModifiedDate())
									.viewCount(board.getViewCount())
									.fileDTOs(board.getFiles().stream()
											  .map(file -> file.entotyToDTO(file))
										      .collect(Collectors.toList()))
									.tagDTOs(board.getTags().stream()
											.map(tag -> tag.entotyToDTO(tag))
											.collect(Collectors.toList()))
									.build();
		return boardDTO;
	}
	
	public void updateBoard(BoardDTO boardDTO) {
		 this.boardContent = boardDTO.getBoardContent();
	}
	
}
