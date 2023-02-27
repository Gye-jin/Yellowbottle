package com.spring.back.entity;

import java.time.LocalDate;
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.back.dto.BoardDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
// board entity를 불러올 때마다 같이 딸려오는 file, tag, comments 생략 => 보류 중인거 , "comments"
@ToString(exclude = {"files", "comments"})
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Board {
	// Column
	// --------------------------------------------------------------------------------------------------------------------------------
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="board_no",nullable = false)
	private Long boardNo;
	
	private String boardContent;
	private Long viewCount;
	
	@CreatedDate
	@Column(updatable = false)
	private LocalDate writtenDate;
	
	@LastModifiedDate
	private LocalDate modifiedDate;
	
	// Join
	// --------------------------------------------------------------------------------------------------------------------------------
	// [User Join]
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	// [File Join]
	@JsonIgnore
	@OneToMany(mappedBy = "board")
//	추후 : @BatchSize 전략 사용
	private List<File> files = new ArrayList<File>();
	
	// [Comment Join]
	@JsonIgnore
	@OneToMany(mappedBy = "board")
	private List<Comment> comments = new ArrayList<Comment>();
	

	
	// Build
	// --------------------------------------------------------------------------------------------------------------------------------
	// DtoToEntity
	public static BoardDTO yourEntityToDTO (Board board) {
		BoardDTO boardDTO = BoardDTO.builder()
									.editor(false)
									.boardNo(board.getBoardNo())
									.userId(board.getUser().getUserId())
									.boardContent(board.getBoardContent())
									.createDate(board.getWrittenDate())
									.viewCount(board.getViewCount())
									.files(board.getFiles().stream()
											  .map(file -> File.entotyToDTO(file))
										      .collect(Collectors.toList()))
									.comments(board.getComments().stream()
											  .map(comment -> Comment.falseEntityToDTO(comment))
											  .collect(Collectors.toList()))
									.modifiedDate(board.getModifiedDate())
									.build();
		return boardDTO;
	}
	
	public static BoardDTO myboardEntityToDTO (Board board) {
		BoardDTO boardDTO = BoardDTO.builder()
				.editor(true)
				.boardNo(board.getBoardNo())
				.userId(board.getUser().getUserId())
				.boardContent(board.getBoardContent())
				.createDate(board.getWrittenDate())
				.viewCount(board.getViewCount())
				.files(board.getFiles().stream()
						.map(file -> File.entotyToDTO(file))
						.collect(Collectors.toList()))
				.comments(board.getComments().stream()
						.map(comment -> Comment.trueEntityToDTO(comment))
						.collect(Collectors.toList()))
				.modifiedDate(board.getModifiedDate())
				.build();
		return boardDTO;
	}
	
	public static BoardDTO countCommentEntityToDTO (Board board) {
		BoardDTO boardDTO = BoardDTO.builder()
				.editor(false)
				.countComment(Long.valueOf(board.getComments().size()))
				.boardNo(board.getBoardNo())
				.userId(board.getUser().getUserId())
				.boardContent(board.getBoardContent())
				.createDate(board.getWrittenDate())
				.viewCount(board.getViewCount())
				.files(board.getFiles().stream()
						.map(file -> File.entotyToDTO(file))
						.collect(Collectors.toList()))
				.modifiedDate(board.getModifiedDate())
				.build();
		return boardDTO;
	}
	
	// Entity Element Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [BoardContent 변경]
	public void updateBoard(String boardContent) {
		 this.boardContent = boardContent;
	}
	
	// [User 채워주기]
	public void updateUser(User user) {
		this.user = user;
	}
	// [ViewCountupdate]
	public void updateViewCount(Long viewCount) {
		this.viewCount = viewCount;
	}
}
