package com.spring.back.service;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.back.dto.FileDTO;
import com.spring.back.entity.Board;
import com.spring.back.entity.File;
import com.spring.back.repository.BoardRepository;
import com.spring.back.repository.FileRepository;

@Service
public class FileServiceImpl implements FileService {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Repository]
	@Autowired
	FileRepository fileRepo;
	@Autowired
	BoardRepository boardRepo;

	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [File 생성]
	// 설명 : boardNo의 게시글에 File 삽입
	@Override
	public void insertFile(Long boardNo, List<MultipartFile> files) {
		// files객체 분해 후 DB 삽입
		for (MultipartFile file : files) {
			try {
				// fileNo는 자동생성이기 때문에 제외 후 builder로 DTO객체 생성
				FileDTO fileDTO = FileDTO.builder().originalFileNAME(file.getOriginalFilename())
						.fileName(UUID.randomUUID() + "_" + file.getOriginalFilename())
						.filePath(System.getProperty("user.dir") + "\\files").build();
				// 생성한 DTO를 entity로 변경
				File fileEntity = FileDTO.dtoToEntity(fileDTO);
				// 파라미터로 전달받은 boardId를 활용하여 board entity 받기
				Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
				// 받아온 board를 file entity에 채워서 file객체 완성
				fileEntity.updateBoard(board);
				// 완성한 entity DB에 삽입
				fileRepo.save(fileEntity);
				file.transferTo(new java.io.File(fileDTO.getFilePath() + "//" + fileDTO.getFileName()));
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
		}
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [File 삭제]
	// 설명 : boardNo의 게시글의 모든 File 삭제
	@Override
	@Transactional
	public void deleteFileBoardNo(Long boardNo) {
		fileRepo.deleteByBoardNo(boardNo);
	}
}
