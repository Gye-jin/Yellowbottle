package com.spring.back.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.back.entity.Board;
import com.spring.back.entity.User;
import com.spring.back.repository.mapping.BoardMapping;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	
	// [user에 해당하는 BoardMapping 가져오기]
	public ArrayList<BoardMapping> findByUser(User user);
	
	// [user가 작성한 게시글 수 가져오기]
	Long countByUser(User user);
	
	/* [추천 게시글 가져오기]
	 * 설명1 : 입력받은 boardNo에 해당하는 군집에서 조회수와 좋아요가 많은 상위 3개의 게시글 출력
	 * 설명2 : [nativeQuery = true] => mySQL에서 사용하는 쿼리문과 동일하게 사용할 수 있도록 설정
	 */
	@Query(value = "SELECT * FROM (SELECT * FROM board fb WHERE NOT fb.board_no = :no) b\r\n" + 
			"WHERE b.cluster_no = (SELECT bb.cluster_no FROM board bb WHERE bb.board_no= :no)\r\n" + 
			"ORDER BY b.view_count DESC, b.like_count DESC LIMIT 3", nativeQuery = true)
	public List<Board> findRecommendedBoardByBoardNo(@Param("no") Long boardNo);
}
