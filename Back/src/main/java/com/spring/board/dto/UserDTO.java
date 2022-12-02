package com.spring.board.dto;

import com.spring.board.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO {
	// DTO 객체
	private String userId;
	private String userPw;
	private String email;
	private String birth;
	private String sex;
	private int grade;
	private boolean subStatus;
	
	// Build를 활용하여 DTO객체를 Entity객체로 변갱
		public static User userDTOToEntity(UserDTO userDTO) {
			User user = User.builder()
									 .userId(userDTO.getUserId())
									 .userPw(userDTO.getUserPw())
									 .email(userDTO.getEmail())
									 .birth(userDTO.getBirth())
									 .sex(userDTO.getSex())
									 .grade(userDTO.getGrade())
									 .subStatus(userDTO.isSubStatus())
									 .build();
			return user;
		}
}
