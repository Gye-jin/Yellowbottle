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

import org.hibernate.annotations.ColumnDefault;
import org.springframework.beans.factory.annotation.Value;
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
	@Column(name="board_no")
	private Long no;
	
	private String userId;
	
	private String boardContent;
	
//    @ColumnDefault("0")
	private Long likeCount;
	
	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime writtenDate;
	
	@LastModifiedDate
	private LocalDateTime modifiedDate;
	
//    @ColumnDefault("0")
	private Long viewCount;
	
	public static BoardDTO entitytoDTO (Board board) {
		BoardDTO boardDTO = BoardDTO.builder()
									.no(board.getNo())
									.userId(board.getUserId())
									.boardContent(board.getBoardContent())
									.likeCount(board.getLikeCount())
									.createDate(board.getWrittenDate())
									.modifiedDate(board.getModifiedDate())
									.viewCount(board.getViewCount())
									.build();
		return boardDTO;
	}
	

}
