package com.spring.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.board.dto.TagDTO;
import com.spring.board.entity.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long>{
	
	public Tag save(TagDTO tagDTO);
	
	@Query("select t from Tag t where t.board.boardNo = :no")
	public void deleteTagByBoardNo(@Param("no") Long No); // ??zzzzzzzzzzzzzzzzz 이게 문제였을까요..?
	/*
	 * 제이피에이가 자동으로 쿼리를 만들어 주는데
	 * 그 기준이 entity이거든요
	 * 근데 예를들어 지금 기준은 Tag 엔터티니까
	 * tag가 가지고 있는 boardNo를 가지고 지웁시다고 로직을 구성하고 ㅇ싶은건데
	 * tag 엔더티에는 boardNo이 아닌 board가 있으니까요 네
	 * JPA 가 이걸 못찾는거에요;;
	 * 그래서 이렇게 boarNo으로만 지우겠다고 하고싶으면
	 * @Query로 직접 넣어줘야해요;또르륵...ㅎㅎ
	 * 
	 * 
	 * 근데 우선 되는지 확인해볼까요?
	 */
}
