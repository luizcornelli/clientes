package com.luizcornelli.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luizcornelli.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer>{

}
