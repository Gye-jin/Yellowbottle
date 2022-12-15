package com.spring.back.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.back.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = {"boards", "comments"})
@Builder
public class User {
	// Column
	// --------------------------------------------------------------------------------------------------------------------------------
	@Id
	@Column(name = "user_id")
	private String userId;

	private String userPw;
	private String email;
	private String birth;
	private String sex;
	private int grade;
	private boolean subStatus;

	// Join
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Board Join]
	@JsonIgnore	// 설명 : toString 무시
	@OneToMany(mappedBy = "user")
	private List<Board> boards = new ArrayList<Board>();
	
	
	// [Comment Join]
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Comment> comments = new ArrayList<Comment>();
	
	
	// Build
	// --------------------------------------------------------------------------------------------------------------------------------
	// DtoToEntity
	public static UserDTO userEntityToDTO(User user) {
		UserDTO userDTO = UserDTO.builder().userId(user.getUserId()).userPw(user.getUserPw()).email(user.getEmail())
				.birth(user.getBirth()).sex(user.getSex()).grade(user.getGrade()).subStatus(user.isSubStatus()).build();
		return userDTO;
	}

	// Entity Element Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [userPw 변경]
	public void updatePw(UserDTO userDTO) {
		this.userPw = userDTO.getUserPw();
	}
	
	// [updateId 변경()->세션에서 가져온 값]
	public void updateId(String userId) {
		this.userId = userId;
	}
}