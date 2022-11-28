package com.spring.board.common.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ExceptionEnum {
	
//	NOT_FOUND(404,"해당 요청값은 존재하지 않습니다."),
//	INTERNAL_SERVER_ERROR(500,"서버에 문제가 발생했습니다");
	E0001(HttpStatus.NOT_FOUND,404,"해당 요청값은 존재하지 않습니다");
	

	private final int statusCode;
	private final String msg;
	private final HttpStatus status;
	
//	ExceptionEnum(int statusCode, String msg) {
//		this.statusCode = statusCode;
//		this.msg = msg;
//	}
	ExceptionEnum(HttpStatus status, int statusCode, String msg) {
		this.status = status;
		this.statusCode = statusCode;
		this.msg = msg;
	}
}
