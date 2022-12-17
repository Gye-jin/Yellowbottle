package com.spring.back.service;

import java.io.IOException;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.Storage.BlobTargetOption;
import com.google.cloud.storage.Storage.PredefinedAcl;
import com.spring.back.dto.FileDTO;
import com.spring.back.entity.Board;
import com.spring.back.entity.File;
import com.spring.back.repository.BoardRepository;
import com.spring.back.repository.FileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Repository]
	@Autowired
	FileRepository fileRepo;
	@Autowired
	BoardRepository boardRepo;
	
	private final Storage storage;

	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [File 생성]
	// 설명 : boardNo의 게시글에 File 삽입
	@Override
	public void uploadFile(Long boardNo, List<MultipartFile> files) {
		// files객체 분해 후 DB 삽입
		for (MultipartFile file : files) {
			try {
				// bloInfo라는 객체를 통해서 
				BlobInfo blobInfo = storage.create(
						// 저장 bucket 이름과 저장할 이름 설정
						BlobInfo.newBuilder("czero-storage", UUID.randomUUID() + "_" + file.getOriginalFilename()).build(), 
						// 저장 파일로 변경
						file.getBytes(), 
						// 파일 전송 허용
						BlobTargetOption.predefinedAcl(PredefinedAcl.PUBLIC_READ)
				);
				
	
				// 파일 저장후 DTO타입으로 변경 후 파일
				FileDTO fileDTO = FileDTO.builder().originalFileNAME(file.getOriginalFilename())
						.fileName(blobInfo.getName())
						.filePath("https://storage.googleapis.com/czero-storage/").build();
				// 생성한 DTO를 entity로 변경
				File fileEntity = FileDTO.dtoToEntity(fileDTO);
				// 파라미터로 전달받은 boardId를 활용하여 board entity 받기
				Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
				// 받아온 board를 file entity에 채워서 file객체 완성
				fileEntity.updateBoard(board);
				// 완성한 entity DB에 삽입
				fileRepo.save(fileEntity);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	}

	@Override
	public void updateFile(Long boardNo, List<MultipartFile> files) {
		if (files != null) {
			// 기존 File 삭제
			fileRepo.deleteByBoardNo(boardNo);
			for (MultipartFile file : files) {
				try {
					// bloInfo라는 객체를 통해서
					BlobInfo blobInfo = storage.create(
							// 저장 bucket 이름과 저장할 이름 설정
							BlobInfo.newBuilder("czero-storage", UUID.randomUUID() + "_" + file.getOriginalFilename())
									.build(),
							// 저장 파일로 변경
							file.getBytes(),
							// 파일 전송 허용
							BlobTargetOption.predefinedAcl(PredefinedAcl.PUBLIC_READ));

					// 파일 저장후 DTO타입으로 변경 후 파일
					FileDTO fileDTO = FileDTO.builder().originalFileNAME(file.getOriginalFilename())
							.fileName(blobInfo.getName()).filePath("https://storage.googleapis.com/czero-storage/")
							.build();
					// 생성한 DTO를 entity로 변경
					File fileEntity = FileDTO.dtoToEntity(fileDTO);
					// 파라미터로 전달받은 boardId를 활용하여 board entity 받기
					Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
					// 받아온 board를 file entity에 채워서 file객체 완성
					fileEntity.updateBoard(board);
					// 완성한 entity DB에 삽입
					fileRepo.save(fileEntity);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}

	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [File 삭제]
	// 설명 : boardNo의 게시글의 모든 File 삭제
	@Override
	@Transactional
	public void deleteFileBoard(Board board)  {
		
		List <File> files = fileRepo.findByBoard(board);
		
		
		fileRepo.deleteByBoardNo(files.get(0).getBoard().getBoardNo());
	}
	
	
	
}
