package com.spring.back.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.spring.back.common.ErrorCode;
import com.spring.back.common.exception.ApiControllerException;
import com.spring.back.dto.BoardDTO;
import com.spring.back.dto.CommentDTO;
import com.spring.back.dto.PersonpageDTO;
import com.spring.back.dto.SessionDTO;
import com.spring.back.entity.Board;
import com.spring.back.entity.Session;
import com.spring.back.entity.User;
import com.spring.back.repository.BoardRepository;
import com.spring.back.repository.CommentRepository;
import com.spring.back.repository.FileRepository;
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
	@Autowired
	FileRepository fileRepo;

	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 작성]
	@Override
	public BoardDTO insertBoard(SessionDTO sessionDTO, BoardDTO boardDTO) {
		Optional<Session>userSession=sessionRepo.findBySessionId(sessionDTO.getSessionId());
		if(!userSession.isPresent()) {
			userSession.orElseThrow(() -> new ApiControllerException(ErrorCode.UNAUTHORIZED));
		}
		Session session = userSession.orElseGet(Session::new);
		Board board = BoardDTO.boardDtotoEntity(boardDTO);
		// board에 user 직접 삽입하기
		board.updateUser(session.getUser());
		
		boardRepo.save(board);
		
		
		return  BoardDTO.builder()
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
				.map(board -> Board.countCommentEntityToDTO(board))
				.collect(Collectors.toList());
	}

	/* [특정 게시글 불러오기]
	 * 설명 : 해당 함수가 실행될 때마다 조회수 +1
	 */
	@Override
	@Transactional
	public BoardDTO getBoardByBoardNo(String sessionId, Long boardNo) {
		System.out.println(sessionId);
		Optional<Session>userSession=sessionRepo.findBySessionId(sessionId);
		if(!userSession.isPresent()) {
			userSession.orElseThrow(() -> new ApiControllerException(ErrorCode.UNAUTHORIZED));
		}
		Session session = userSession.orElseGet(Session::new);
		Board board = boardRepo.findById(boardNo).orElseThrow(NoSuchElementException::new);
		board.updateViewCount(board.getViewCount() + 1);
		Long Countcomment = Long.valueOf(board.getComments().size());
		if (session.getUser().getUserId().equals(board.getUser().getUserId())) {
			BoardDTO boardDTO = Board.myboardEntityToDTO(board);
			boardDTO.setCountComment(Countcomment);
			for (CommentDTO comment : boardDTO.getComments()) {
				if (comment.getUserId().equals(session.getUser().getUserId())) {
					comment.setEditor(true);
				} else {
					comment.setEditor(false);
				}
			}
			return boardDTO;
		} else {
			BoardDTO boardDTO = Board.yourEntityToDTO(board);
			boardDTO.setCountComment(Countcomment);
			for (CommentDTO comment : boardDTO.getComments()) {
				if (comment.getUserId().equals(session.getUser().getUserId())) {
					comment.setEditor(true);
				} else {
					comment.setEditor(false);
				}
			}
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
		for(BoardDTO boardDTO : boardDTOs) {
			Long CountComment = Long.valueOf(boardDTO.getComments().size());
			boardDTO.setCountComment(CountComment);
		}
		return boardDTOs;
	}
	
	// [개인 페이지 게시글 불러오기]
	@Override
	@Transactional
	public PersonpageDTO getBoardByUserId(String userId) {
		User user = userRepo.findByUserId(userId);
		ArrayList<BoardMapping> boardMappings = boardRepo.findByUserOrderByBoardNoDesc(user);
		if (sessionRepo.findByUser(user) != null) {
			PersonpageDTO mypageDTO = PersonpageDTO.builder().editor(true).grade(user.getGrade())
					.countBoard(Long.valueOf(user.getBoards().size()))
					.countComment(Long.valueOf(user.getComments().size())).boards(boardMappings).build();
			return mypageDTO;
		} else {
			PersonpageDTO mypageDTO = PersonpageDTO.builder().editor(false).grade(user.getGrade())
					.countBoard(Long.valueOf(user.getBoards().size()))
					.countComment(Long.valueOf(user.getComments().size())).boards(boardMappings).build();
			return mypageDTO;
		}

	}

	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 수정]
	@Override
	@Transactional
	public BoardDTO updateBoard(SessionDTO sessionDTO, BoardDTO newboardDTO) {
		Board board = boardRepo.findById(newboardDTO.getBoardNo()).orElseThrow(NoSuchElementException::new);
		Optional<Session>userSession=sessionRepo.findBySessionId(sessionDTO.getSessionId());
		if(!userSession.isPresent()) {
			userSession.orElseThrow(() -> new ApiControllerException(ErrorCode.UNAUTHORIZED));
		}
		Session session = userSession.orElseGet(Session::new);
		if(session.getUser().equals(session.getUser())) {
			board.updateBoard(newboardDTO.getBoardContent());
			return newboardDTO;
		}
		return null;
	}

	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [게시글 삭제]
	@Override
	@Transactional
	public boolean deleteBoard(SessionDTO sessionDTO, BoardDTO boardDTO) {
		Board deleteBoard = boardRepo.findById(boardDTO.getBoardNo()).orElseThrow(NoSuchElementException::new);
		Optional<Session>userSession=sessionRepo.findBySessionId(sessionDTO.getSessionId());
		if(!userSession.isPresent()) {
			userSession.orElseThrow(() -> new ApiControllerException(ErrorCode.UNAUTHORIZED));
		}
		Session session = userSession.orElseGet(Session::new);
		// 삭제 요청한 userId와 요청한 게시글의 userId가 같을 경우에만 삭제 진행
		if (deleteBoard.getUser().equals(session.getUser())) {
			// file과 comment먼저 삭제 후 게시글 삭제 진행
			commentRepo.deleteByboardNo(boardDTO.getBoardNo());
			fileRepo.deleteByBoardNo(boardDTO.getBoardNo());
			boardRepo.deleteById(boardDTO.getBoardNo());
			return true;
		}
		return false;
	}
}
