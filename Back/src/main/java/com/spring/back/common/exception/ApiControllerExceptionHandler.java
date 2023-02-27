package com.spring.back.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.spring.back.common.ErrorCode;
import com.spring.back.common.ErrorResponse;

import org.springframework.web.HttpRequestMethodNotSupportedException;



import lombok.extern.slf4j.Slf4j;


@RestControllerAdvice
@Slf4j
public class ApiControllerExceptionHandler {
	

	 @ExceptionHandler(ApiControllerException.class)
	    protected ResponseEntity<ErrorResponse> handleCustomException(final ApiControllerException e) {
	        log.error("handleCustomException: {}", e.getErrorCode());
	        return ResponseEntity
	                .status(e.getErrorCode().getStatus().value())
	                .body(new ErrorResponse(e.getErrorCode()));
	    }
	 
	    /*
	     * HTTP 405 Exception
	     */
	    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	    protected ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(final HttpRequestMethodNotSupportedException e) {
	        log.error("handleHttpRequestMethodNotSupportedException: {}", e.getMessage());
	        return ResponseEntity
	                .status(ErrorCode.METHOD_NOT_ALLOWED.getStatus().value())
	                .body(new ErrorResponse(ErrorCode.METHOD_NOT_ALLOWED));
	    }

	    /*
	     * HTTP 500 Exception
	     */
	    @ExceptionHandler(Exception.class)
	    protected ResponseEntity<ErrorResponse> handleException(final Exception e) {
	        log.error("handleException: {}", e.getMessage());
	        return ResponseEntity
	                .status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus().value())
	                .body(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR));
	    }
	    
}
