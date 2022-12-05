package com.spring.diary.common.exception;

import java.util.NoSuchElementException;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExcepton {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<String> handlerNoSuchElementException(NoSuchElementException e) {
//		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 요청값은 존재하지 않습니다.");
//		return ResponseEntity
//				.status(ExceptionEnum.NOT_FOUND.getStatusCode())
//				.body(ExceptionEnum.NOT_FOUND.getMsg());
		logger.error(e.getMessage());
		return ResponseEntity
				.status(ExceptionEnum.E0001.getStatus())
				.body(ExceptionEnum.E0002.getMsg());
	}
	
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<String> handlerEntityNotFoundException(EntityNotFoundException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 요청값은 존재하지 않습니다.");
//		return ResponseEntity.status(404).body("해당 요청값은 존재하지 않습니다.");
	}
}
