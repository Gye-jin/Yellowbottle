package com.spring.board.common.exception;

import java.util.NoSuchElementException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ApiException {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<String> handlerNoSuchElementException(NoSuchElementException e) {
		logger.error(e.getMessage());
//		return ResponseEntity.status(ExceptionEnum.NOT_FOUND.getStatusCode())
//				.body(ExceptionEnum.NOT_FOUND.getMsg());
		return ResponseEntity.status(ExceptionEnum.E0001.getStatusCode())
				.body(ExceptionEnum.E0001.getMsg());
		}
}
