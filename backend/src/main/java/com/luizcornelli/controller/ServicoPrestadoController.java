package com.luizcornelli.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.luizcornelli.dto.ServicoPrestadoDTO;
import com.luizcornelli.model.Cliente;
import com.luizcornelli.model.ServicoPrestado;
import com.luizcornelli.repository.ClienteRepository;
import com.luizcornelli.repository.ServicoPrestadoRepository;
import com.luizcornelli.util.BigDecimalConverter;

@RestController
@RequestMapping("/servicos-prestados")
@CrossOrigin("http://localhost:4200")
public class ServicoPrestadoController {

	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private ServicoPrestadoRepository servicoPrestadoRepository;
	
	@Autowired
	private BigDecimalConverter bigDecimalConverter;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ServicoPrestado salvar(@RequestBody ServicoPrestadoDTO dto) {
		
		Cliente clienteOptional = clienteRepository.findById(dto.getIdCliente())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente inexistente"));
		
		ServicoPrestado servicoPrestado = new ServicoPrestado();
		servicoPrestado.setDescricao(dto.getDescricao());
		servicoPrestado.setData( LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy")) );
		servicoPrestado.setValor(bigDecimalConverter.converter(dto.getPreco()));
		servicoPrestado.setCliente(clienteOptional);
		
		return servicoPrestadoRepository.save(servicoPrestado);
	}
	
	@GetMapping
	public List<ServicoPrestado> pesquisar(
			@RequestParam(value = "nome", required = false, defaultValue = "") String nome, 
			@RequestParam(value = "mes", required = false) Integer mes )
	{
		return servicoPrestadoRepository.findByNomeAndMes("%" + nome + "%", mes);
	}
}
