package com.spring.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.spring.back.dto.FileDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class File {
	// Column
	// --------------------------------------------------------------------------------------------------------------------------------
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="file_no",nullable = false)
	private Long fileNo;

	private String fileName;
	private String filePath;
	private String originalFileName;
	
	// Join
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Board Join]
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="board_no")
	private Board board;

	// Build
	// --------------------------------------------------------------------------------------------------------------------------------
	// [DtoToEntity]
	public static FileDTO entotyToDTO(File file) {
		FileDTO fileDTO = FileDTO.builder()
				.originalFileNAME(file.getOriginalFileName())
				.fileName(file.getFileName())
				.filePath(file.getFilePath())
				.build();
		return fileDTO;
	}

	// Entity Element Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Board 채워주기]
	public void updateBoard(Board board) {
		this.board = board;
	}
	
	// Interface
	// --------------------------------------------------------------------------------------------------------------------------------
	public interface FileMapping {
	    String getFileName();
	}
}
