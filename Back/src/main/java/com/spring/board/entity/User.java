package com.spring.board.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.board.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Builder
public class User {
	// sql에서 받아온 데이터 entity객체로 설정
	@Id
	@JsonIgnore
	@OneToOne(mappedBy = "user")
	private String userId;
	
	private String userPw;
	private String email;
	private String birth;
	private String sex;
	private int grade;
	private boolean subStatus;
	
	// Build를 활용하여 entity객체를 DTO객체로 변갱
	public static UserDTO userEntityToDTO(User user) {
		UserDTO userDTO = UserDTO.builder()
								 .userId(user.getUserId())
								 .userPw(user.getUserPw())
								 .email(user.getEmail())
								 .birth(user.getBirth())
								 .sex(user.getSex())
								 .grade(user.getGrade())
								 .subStatus(user.isSubStatus())
								 .build();
		return userDTO;
	}

}
