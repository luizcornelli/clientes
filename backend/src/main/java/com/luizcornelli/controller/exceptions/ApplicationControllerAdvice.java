package com.luizcornelli.controller.exceptions;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

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
	
	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity handleResponseStatusException(ResponseStatusException responseStatusException) {
		
		String messagemErro = responseStatusException.getReason();
		HttpStatus codigoStatus = responseStatusException.getStatus();
		ApiErros apiErros = new ApiErros(messagemErro);
		return new ResponseEntity(apiErros, codigoStatus);
	}
}
