package com.luizcornelli.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luizcornelli.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{

}
