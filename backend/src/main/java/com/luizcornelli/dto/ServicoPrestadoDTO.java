package com.luizcornelli.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class ServicoPrestadoDTO {
	
	@NotEmpty(message = "{campo.descricao.obrigatorio}")
	private String descricao;
	
	@NotEmpty(message = "{campo.preco.obrigatorio}")
	private String preco;
	
	@NotEmpty(message = "{campo.data.obrigatorio}")
	private String data;
	
	@NotNull(message = "{campo.idCliente.obrigatorio}")
	private Integer idCliente;
	
	public ServicoPrestadoDTO() {
	}

	public ServicoPrestadoDTO(String descricao, String preco, String data, Integer idCliente) {
		this.descricao = descricao;
		this.preco = preco;
		this.data = data;
		this.idCliente = idCliente;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getPreco() {
		return preco;
	}

	public void setPreco(String preco) {
		this.preco = preco;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Integer getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Integer idCliente) {
		this.idCliente = idCliente;
	}
}
