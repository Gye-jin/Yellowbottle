package com.spring.back.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.spring.back.dto.BoardDTO;
import com.spring.back.dto.MypageDTO;
import com.spring.back.entity.Board;
import com.spring.back.entity.User;
import com.spring.back.repository.BoardRepository;
import com.spring.back.repository.CommentRepository;
import com.spring.back.repository.UserRepository;
import com.spring.back.repository.mapping.BoardMapping;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Repository]
	@Autowired
	BoardRepository boardRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	CommentRepository commentRepo;
	
	// [Service]
	@Autowired
	UserServiceImpl userService;
	@Autowired
	FileServiceImpl fileService;
	@Autowired
	CommentServiceImpl commentService;

	// readAll
	// --------------------------------------------------------------------------------------------------------------------------------
	// [전체 게시글]
	@Override
	public List<BoardDTO> findBoardsByPage(PageRequest pageRequest) {
	  
	 		
	    return boardRepo.findAll(pageRequest).stream()
	    		.map(board -> Board.boardEntitytoDTO(board))
	    		.collect(Collectors.toList());
	}
	
	

	
	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 작성]
	@Override
	public Long insertBoard(BoardDTO boardDTO) {
		Board board = BoardDTO.boardDtotoEntity(boardDTO);
		// board에 user 직접 삽입하기
		User user = userRepo.findByUserId(boardDTO.getUserId());
		board.updateUser(user);
		return boardRepo.save(board).getBoardNo();
	}

	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [특정 게시글 불러오기]
	@Override
	@Transactional
	public BoardDTO getBoardByBoardNo(Long BoardNo) {
		Board board = boardRepo.findById(BoardNo).orElseThrow(NoSuchElementException::new);
		board.updateViewCount(board.getViewCount()+1);
		BoardDTO boardDTO = Board.boardEntitytoDTO(board);
		return boardDTO;
	}

	// [개인 페이지 게시글 불러오기]
	@Override
	@Transactional
	public MypageDTO getBoardByUserId(String userId) {
		ArrayList<BoardMapping> boardMappings = null;
		User user = userRepo.findByUserId(userId);
		boardMappings = boardRepo.findByUser(user);
		Long countBoard = boardRepo.countByUser(user);
		Long countComment = commentRepo.countByUser(user);
		MypageDTO mypageDTO = MypageDTO.builder().countBoard(countBoard).countComment(countComment)
				.boardDTOs(boardMappings).build();
		return mypageDTO;
	}

	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 수정]
	@Override
	@Transactional
	public BoardDTO updateBoard(BoardDTO newboardDTO, List<MultipartFile> files) {
		Board board = boardRepo.findById(newboardDTO.getBoardNo()).orElseThrow(NoSuchElementException::new);
		board.updateBoard(newboardDTO);
		BoardDTO boardDTO = Board.boardEntitytoDTO(board);
		// 기존 File 삭제
		fileService.deleteFileBoardNo(boardDTO.getBoardNo());
		// 새로운 File 추가
		fileService.uploadFile(boardDTO.getBoardNo(), files);
		return boardDTO;
	}
	
	@Override
	@Transactional
	public BoardDTO updateLikeCount(Long boardDTONo) {
		Board board = boardRepo.findById(boardDTONo).orElseThrow(NoSuchElementException::new);
		board.updateLikeCount(board.getLikeCount()+1);
		BoardDTO boardDTO = Board.boardEntitytoDTO(board);

		return boardDTO;
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 삭제]
	@Override
	@Transactional
	public boolean deleteBoard(BoardDTO boardDTO) {
		Board deleteBoard = boardRepo.findById(boardDTO.getBoardNo()).orElseThrow(NoSuchElementException::new);

		// 삭제 요청한 userId와 요청한 게시글의 userId가 같을 경우에만 삭제 진행
		if (deleteBoard.getUser().getUserId().equals(boardDTO.getUserId())) {
			// file과 comment먼저 삭제 후 게시글 삭제 진행
			commentService.deleteAllComment(boardDTO.getBoardNo());
			fileService.deleteFileBoardNo(boardDTO.getBoardNo());
			boardRepo.deleteById(boardDTO.getBoardNo());
			return true;
		}
		return false;
	}
}
