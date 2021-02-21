package com.luizcornelli.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.luizcornelli.model.Cliente;
import com.luizcornelli.repository.ClienteRepository;

@RestController
@RequestMapping(path = "/clientes")
@CrossOrigin("http://localhost:4200")
public class ClienteController {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Cliente> find(@PathVariable Integer id) {

		Cliente cliente = clienteRepository.findById(id).orElseThrow( 
					() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));
		
		return ResponseEntity.ok(cliente);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public  Cliente salvar(@RequestBody @Valid Cliente cliente) {
		
		return clienteRepository.save(cliente);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		
		clienteRepository.findById(id)
		.map( cliente -> {
			clienteRepository.deleteById(id);
			return Void.TYPE;
		})
		.orElseThrow( 
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));
		
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@PathVariable Integer id, @RequestBody @Valid Cliente clienteAtualizado) {
	
		clienteRepository.findById(id)
		.map( cliente -> {
			
			cliente.setNome(clienteAtualizado.getNome());
			cliente.setCpf(clienteAtualizado.getCpf());
			
			return clienteRepository.save(cliente);
		})
		.orElseThrow( 
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));
		
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Cliente>> findAll() {

		List<Cliente> list = clienteRepository.findAll();
		return ResponseEntity.ok(list);
	}
}
