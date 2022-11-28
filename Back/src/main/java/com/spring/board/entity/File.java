package com.spring.board.entity;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
public class File {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="file_no",nullable = false)
	private Long fileNo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="board_no")
	private Board board;
	

	private String fileName;
	private String filePath;
	private String originalFileName;


	public void updateBoard(Board board) {
		this.board = board;
	}
	
	public static FileDTO entotyToDTO(File file) {
		FileDTO fileDTO = FileDTO.builder()
				 .originalFileNAME(file.getOriginalFileName())
				 .fileName(UUID.randomUUID() +"_"+file.getFileName())
				 .filePath(System.getProperty("user.dir")+"\\files")
				 .build();
		return fileDTO;
}
	
	
	
	
}
