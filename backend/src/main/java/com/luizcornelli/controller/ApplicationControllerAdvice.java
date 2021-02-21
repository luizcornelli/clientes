package com.luizcornelli.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationControllerAdvice {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiErros handleValidationErros(MethodArgumentNotValidException methodArgumentNotValidException) {
		
		BindingResult bindingResult = methodArgumentNotValidException.getBindingResult(); 
		List<String> messages = bindingResult.getAllErrors().stream()
				.map(ObjectError -> ObjectError.getDefaultMessage()).collect(Collectors.toList());
		
		return new ApiErros(messages);
	}
}
