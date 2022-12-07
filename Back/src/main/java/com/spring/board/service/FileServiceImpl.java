package com.spring.board.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.board.dto.FileDTO;
import com.spring.board.entity.Board;
import com.spring.board.entity.File;
import com.spring.board.repository.BoardRepository;
import com.spring.board.repository.FileRepository;

@Service
public class FileServiceImpl implements FileService{

	// Repository 연결
	@Autowired
	FileRepository fileRepo;
	@Autowired
	BoardRepository boardRepo;
	
	// 새로운 File 삽입
	@Override
	public void insertFile(Long boardId, List<MultipartFile> files) {
		// files객체 분해 후 DB 삽입
		for (MultipartFile file : files) {
			// fileNo는 autoincrement이기 때문에 제외 후 builder로 DTO객체 생성
			FileDTO fileDTO = FileDTO.builder()
									 .originalFileNAME(file.getOriginalFilename())
									 .fileName(UUID.randomUUID() + "_" + file.getOriginalFilename())
									 .filePath(System.getProperty("user.dir") + "\\files")
									 .build();
			// 생성한 DTO를 entity로 변경
			File fileEntity = FileDTO.dtoToEntity(fileDTO);
			// 파라미터로 전달받은 boardId를 활용하여 board entity 받기
			Board board = boardRepo.findById(boardId).orElseThrow(NoSuchElementException::new);
			// 받아온 board를 file entity에 채워서 file객체 완성
			fileEntity.updateBoard(board);
			// 완성한 entity DB에 삽입
			fileRepo.save(fileEntity);
		}
	}
	
	@Override
	@Transactional
	public void deleteFileBoard(Long boardId) {
		fileRepo.deletFileByBoardNo(boardId);
	}
	
	@Override
	@Transactional
	public void deleteFile(Long fileNo) {
		fileRepo.deleteById(fileNo);
	}
	

}

