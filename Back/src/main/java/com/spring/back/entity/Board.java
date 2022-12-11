package com.spring.back.entity;

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
	private Long likeCount;
	
	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime writtenDate;
	
	private Long viewCount;
	
	@LastModifiedDate
	private LocalDateTime modifiedDate;
	
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
	List<File> files = new ArrayList<File>();
	
	// [Comment Join]
	@JsonIgnore
	@OneToMany(mappedBy = "board")
	List<Comment> comments = new ArrayList<Comment>();
	
	// Build
	// --------------------------------------------------------------------------------------------------------------------------------
	// DtoToEntity
	public static BoardDTO boardEntitytoDTO (Board board) {
		BoardDTO boardDTO = BoardDTO.builder()
									.boardNo(board.getBoardNo())
									.userId(board.getUser().getUserId())
									.boardContent(board.getBoardContent())
									.likeCount(board.getLikeCount())
									.createDate(board.getWrittenDate())
									.viewCount(board.getViewCount())
									.fileDTOs(board.getFiles().stream()
											  .map(file -> File.entotyToDTO(file))
										      .collect(Collectors.toList()))
									.commentDTOs(board.getComments().stream()
											  .map(comment -> Comment.commentEntityToDTO(comment))
											  .collect(Collectors.toList()))
									.modifiedDate(board.getModifiedDate())
									.build();
		return boardDTO;
	}
	
	// Entity Element Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [BoardContent 변경]
	public void updateBoard(BoardDTO boardDTO) {
		 this.boardContent = boardDTO.getBoardContent();
	}
	
	// [User 채워주기]
	public void updateUser(User user) {
		this.user = user;
	}
	// [ViewCountupdate]
	public void updateViewCount(Long viewCount) {
		this.viewCount = viewCount;
	}
	// [LikeCountupdate]
	public void updateLikeCount(Long likeCount) {
		this.likeCount = likeCount;
	}
}
