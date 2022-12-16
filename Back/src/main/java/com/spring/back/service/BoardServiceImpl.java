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
	public BoardDTO insertBoard(SessionDTO sessionDTO, BoardDTO boardDTO) {
		Session session = sessionRepo.findBySessionId(sessionDTO.getSessionId());
		Board board = BoardDTO.boardDtotoEntity(boardDTO);
		// board에 user 직접 삽입하기
		board.updateUser(session.getUser());
		System.out.println("업데이트");
		
		boardRepo.save(board);
		
		
		
		
		return  boardDTO.builder()
				.boardContent(board.getBoardContent())
				.boardNo(board.getBoardNo())
				.build();
}

	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
	// [전체 게시글 불러오기]
	@Override
	public List<BoardDTO> findBoardsByPage(PageRequest pageRequest) {
		return boardRepo.findAll(pageRequest).stream()
				.map(board -> Board.yourEntityToDTO(board))
				.collect(Collectors.toList());
	}

	/* [특정 게시글 불러오기]
	 * 설명 : 해당 함수가 실행될 때마다 조회수 +1
	 */
	@Override
	@Transactional
	public BoardDTO getBoardByBoardNo(String sessionId, Long boardNo) {
		Session session = sessionRepo.findBySessionId(sessionId);
		Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
		board.updateViewCount(board.getViewCount() + 1);
	
		if (session.getUser().getUserId().equals(board.getUser().getUserId())) {
			BoardDTO boardDTO = Board.myboardEntityToDTO(board);
			return boardDTO;
		} else {
			BoardDTO boardDTO = Board.yourEntityToDTO(board);
			return boardDTO;
		}
		
	
	}
	/* [수정하기 위한 게시글 불러오기
	 */
	@Override
	@Transactional
	public BoardDTO findBoardByBoardNo(Long boardNo) {
		Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
		BoardDTO boardDTO = Board.yourEntityToDTO(board);
	
			return boardDTO;
			
		
	}
	
	/* [추천게시글 가져오기]
	 * 설명 : boardNo와 동일한 군집 중 조회수와 좋아요수가 많은 상위 3개 출력
	 */
	@Override
	public List<BoardDTO> findRecoBoard(Long boardNo) {
		// 추천 게시글 불러오기
		List<Board> recoBoard = boardRepo.findRecommendedBoardByBoardNo(boardNo);
		List<BoardDTO> boardDTOs = recoBoard.stream().map(board -> Board.yourEntityToDTO(board)).collect(Collectors.toList());
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
		System.out.println(boardMappings);
		if (sessionRepo.findByUser(user) != null) {
			PersonpageDTO mypageDTO = PersonpageDTO.builder().editor(true).countBoard(countBoard).countComment(countComment)
					.boards(boardMappings).build();
			return mypageDTO;
		} else {
			PersonpageDTO mypageDTO = PersonpageDTO.builder().editor(false).countBoard(countBoard).countComment(countComment)
					.boards(boardMappings).build();
			return mypageDTO;
		}

	}

	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 수정]
	@Override
	@Transactional
	public boolean updateBoard(SessionDTO sessionDTO, BoardDTO newboardDTO, List<MultipartFile> files) {
		Board board = boardRepo.findById(newboardDTO.getBoardNo()).orElseThrow(NoSuchElementException::new);
		Session session = sessionRepo.findBySessionId(sessionDTO.getSessionId());
		if(board.getUser().equals(session.getUser())) {
			board.updateBoard(newboardDTO);
			BoardDTO boardDTO = Board.yourEntityToDTO(board);
			// 기존 File 삭제
			fileService.deleteFileBoardNo(boardDTO.getBoardNo());
			// 새로운 File 추가
			fileService.uploadFile(boardDTO.getBoardNo(), files);
			return true;
		}
		return false;
	}
	
	// [좋아요 수 +1]
	@Override
	@Transactional
	public BoardDTO updateLikeCount(Long boardNo) {
		Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
		board.updateLikeCount(board.getLikeCount()+1);
		BoardDTO boardDTO = Board.yourEntityToDTO(board);
		return boardDTO;
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 삭제]
	@Override
	@Transactional
	public boolean deleteBoard(SessionDTO sessionDTO, BoardDTO boardDTO) {
		Board deleteBoard = boardRepo.findById(boardDTO.getBoardNo()).orElseThrow(NoSuchElementException::new);
		Session session = sessionRepo.findBySessionId(sessionDTO.getSessionId());
		// 삭제 요청한 userId와 요청한 게시글의 userId가 같을 경우에만 삭제 진행
		if (deleteBoard.getUser().equals(session.getUser())) {
			// file과 comment먼저 삭제 후 게시글 삭제 진행
			commentService.deleteAllComment(boardDTO.getBoardNo());
			fileService.deleteFileBoardNo(boardDTO.getBoardNo());
			boardRepo.deleteById(boardDTO.getBoardNo());
			return true;
		}
		return false;
	}
}
