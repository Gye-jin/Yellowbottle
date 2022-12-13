package com.spring.back.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.spring.back.dto.CertifiedDTO;
import com.spring.back.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Certified {
	@Id
	private Integer certifiedNo;
	
	// [User Join]
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id")
	private User user;
	
	// [인증번호 변경]
	public void updateCertifiedNo(Certified certified) {
		this.certifiedNo = certified.getCertifiedNo();
	}
	
	// certifiedDTO
	public static CertifiedDTO certifiedEntityToDTO(Certified certified) {
		CertifiedDTO certifiedDTO = CertifiedDTO.builder().CertifiedNo(certified.getCertifiedNo())
				.UserId(certified.getUser().getUserId()).build();
		return certifiedDTO;
	}
}
