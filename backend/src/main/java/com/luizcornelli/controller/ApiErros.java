package com.luizcornelli.controller;

import java.util.Arrays;
import java.util.List;

public class ApiErros {

	private List<String> erros;

	public ApiErros(List<String> erros) {

		this.erros = erros;
	}

	public ApiErros(String message) {

		this.erros = Arrays.asList(message);
	}

	public List<String> getErros() {
		return erros;
	}
}
