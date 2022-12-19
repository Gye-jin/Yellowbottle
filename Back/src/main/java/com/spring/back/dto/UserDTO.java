package com.spring.back.dto;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.spring.back.entity.User;
import com.spring.back.user.UserGrade;

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
	
	@Enumerated(EnumType.STRING)
	private UserGrade grade;
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