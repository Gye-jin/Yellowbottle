package com.spring.board.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;import org.hibernate.query.criteria.internal.expression.function.LengthFunction;
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
	
	@Autowired
	FileRepository fileRepo;
	
	@Autowired
	BoardRepository boardRepo;
	

	@Override
	public void insertFile(Long boardId, List<MultipartFile> files) {

		for (MultipartFile file : files) {
			FileDTO fileDTO = FileDTO.builder()
									 .originalFileNAME(file.getOriginalFilename())
									 .fileName(UUID.randomUUID() + "_" + file.getOriginalFilename())
									 .filePath(System.getProperty("user.dir") + "\\files")
									 .build();

			File entity = fileDTO.dtoToEntity(fileDTO);
			Board board = boardRepo.getById(boardId);

			entity.updateBoard(board);
			fileRepo.save(entity);
		}
	}
	
	@Override
	public void deleteFileBoard(Long diaryId) {
		fileRepo.deleteByBoardNo(diaryId);
	}
	
	@Override	
	public void deleteFile(Long fileNo) {
		fileRepo.deleteById(fileNo);
	}
	

}

