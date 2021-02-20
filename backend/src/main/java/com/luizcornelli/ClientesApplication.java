package com.luizcornelli;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.luizcornelli.model.Cliente;
import com.luizcornelli.repository.ClienteRepository;

@SpringBootApplication
public class ClientesApplication {
	
	@Autowired 
	private ClienteRepository clienteRepository;
	
	@Bean
	public CommandLineRunner run() {
		
		return args -> {
			
			Cliente cliente = new Cliente();
			cliente.setCpf("10822827409");
			cliente.setNome("Luiz");
			
			clienteRepository.save(cliente);
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(ClientesApplication.class, args);
	}

}
