package com.spring.back.common.exception;



import com.spring.back.common.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiControllerException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	private final ErrorCode errorCode;

}
