package com.spring.back.common;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

	/*
	 * 400 BAD_REQUEST: 잘못된 요청
	 */
	BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
	
	/*
	 * 401 UNAUTHORIZED: 인가되지 않은 회원
	 */
	UNAUTHORIZED(HttpStatus.UNAUTHORIZED,"인가되지 않은 회원입니다."),
	
	/*
	 * 403 FORBIDDEN: 접근할 권리가 없음.
	 */
	FORBIDDEN(HttpStatus.FORBIDDEN,"권한이 없습니다."),
	
	/*
	 * 404 NOT_FOUND: 리소스를 찾을 수 없음
	 */
	POSTS_NOT_FOUND(HttpStatus.NOT_FOUND, "게시글 정보를 찾을 수 없습니다."),

	/*
	 * 405 METHOD_NOT_ALLOWED: 허용되지 않은 Request Method 호출
	 */
	METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 메서드입니다."),
	
	
	CONFILICT(HttpStatus.CONFLICT,"중복된 값입니다."),

	/*
	 * 500 INTERNAL_SERVER_ERROR: 내부 서버 오류
	 */
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류입니다."),
	
	
	
	;

	private final HttpStatus status;
	private final String message;
}
