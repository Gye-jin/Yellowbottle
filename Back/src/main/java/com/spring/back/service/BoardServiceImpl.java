package com.spring.back.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.back.dto.BoardDTO;
import com.spring.back.dto.BoardstatusDTO;
import com.spring.back.dto.PersonpageDTO;
import com.spring.back.dto.SessionDTO;
import com.spring.back.entity.Board;
import com.spring.back.entity.Session;
import com.spring.back.entity.User;
import com.spring.back.repository.BoardRepository;
import com.spring.back.repository.CommentRepository;
import com.spring.back.repository.SessionRepository;
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
	@Autowired
	SessionRepository sessionRepo;
	
	
	// [Service]
	@Autowired
	UserServiceImpl userService;
	@Autowired
	FileServiceImpl fileService;
	@Autowired
	CommentServiceImpl commentService;

	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 작성]
	@Override
	public Long insertBoard(SessionDTO sessionDTO, BoardDTO boardDTO) {
		Session session = sessionRepo.findBySessionId(sessionDTO.getUserId());
		Board board = BoardDTO.boardDtotoEntity(boardDTO);

		// board에 user 직접 삽입하기
		User user = userRepo.findByUserId(session.getUser().getUserId());

		board.updateUser(user);
		return boardRepo.save(board).getBoardNo();
	}

	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [전체 게시글 불러오기]
	@Override
	public List<BoardDTO> findBoardsByPage(PageRequest pageRequest) {
		return boardRepo.findAll(pageRequest).stream()
				.map(board -> Board.boardEntityToDTO(board))
				.collect(Collectors.toList());
	}

	/* [특정 게시글 불러오기]
	 * 설명 : 해당 함수가 실행될 때마다 조회수 +1
	 */
	@Override
	@Transactional
	public BoardstatusDTO getBoardByBoardNo(String sessionId, Long boardNo) {
		Session session = sessionRepo.findBySessionId(sessionId);
		Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
		board.updateViewCount(board.getViewCount() + 1);
		BoardDTO boardDTO = Board.boardEntityToDTO(board);
		if (session.getUser().getUserId().equals(board.getUser().getUserId())) {
			BoardstatusDTO boardstatusDTO = BoardstatusDTO.builder().Editor(true).boardDTO(boardDTO).build();
			return boardstatusDTO;
		} else {
			BoardstatusDTO boardstatusDTO = BoardstatusDTO.builder().Editor(false).boardDTO(boardDTO).build();
			return boardstatusDTO;
		}
		
	
	}
	/* [수정하기 위한 게시글 불러오기]
	 * 설명 : 해당 함수가 실행될 때마다 조회수 +1
	 */
	@Override
	@Transactional
	public BoardDTO findBoardByBoardNo(Long boardNo) {
		Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
		BoardDTO boardDTO = Board.boardEntityToDTO(board);
	
			return boardDTO;
			
		
	}
	
	/* [추천게시글 가져오기]
	 * 설명 : boardNo와 동일한 군집 중 조회수와 좋아요수가 많은 상위 3개 출력
	 */
	@Override
	public List<BoardDTO> findRecoBoard(Long boardNo) {
		// 추천 게시글 불러오기
		List<Board> recoBoard = boardRepo.findRecommendedBoardByBoardNo(boardNo);
		List<BoardDTO> boardDTOs = recoBoard.stream().map(board -> Board.boardEntityToDTO(board)).collect(Collectors.toList());
		return boardDTOs;
	}
	
	// [개인 페이지 게시글 불러오기]
	@Override
	@Transactional
	public PersonpageDTO getBoardByUserId(String userId) {
		User user = userRepo.findByUserId(userId);
		ArrayList<BoardMapping> boardMappings = boardRepo.findByUser(user);
		Long countBoard = boardRepo.countByUser(user);
		Long countComment = commentRepo.countByUser(user);
		if (sessionRepo.findByUser(user) != null) {
			PersonpageDTO mypageDTO = PersonpageDTO.builder().Editor(true).countBoard(countBoard).countComment(countComment)
					.boardDTOs(boardMappings).build();
			return mypageDTO;
		} else {
			PersonpageDTO mypageDTO = PersonpageDTO.builder().Editor(false).countBoard(countBoard).countComment(countComment)
					.boardDTOs(boardMappings).build();
			return mypageDTO;
		}

	}

	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 수정]
	@Override
	@Transactional
	public BoardDTO updateBoard(BoardDTO newboardDTO, List<MultipartFile> files) {
		Board board = boardRepo.findById(newboardDTO.getBoardNo()).orElseThrow(NoSuchElementException::new);
		board.updateBoard(newboardDTO);
		BoardDTO boardDTO = Board.boardEntityToDTO(board);
		// 기존 File 삭제
		fileService.deleteFileBoardNo(boardDTO.getBoardNo());
		// 새로운 File 추가
		fileService.uploadFile(boardDTO.getBoardNo(), files);
		return boardDTO;
	}
	
	// [좋아요 수 +1]
	@Override
	@Transactional
	public BoardDTO updateLikeCount(Long boardNo) {
		Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
		board.updateLikeCount(board.getLikeCount()+1);
		BoardDTO boardDTO = Board.boardEntityToDTO(board);
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
