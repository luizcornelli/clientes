import { Usuario } from './usuario';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[]

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(){

    this.authService.tentarLogar(this.username, this.password)
    .subscribe(response => {

      const access_token = JSON.stringify(response)
      localStorage.setItem('access_token', access_token)

      this.router.navigate(['/home'])
    }, errorResponse => {
      this.errors = ['Usuário e/ou senha incorrentos.']
    })

  }

  preparaCadastrar(event){
    event.preventDefault()
    this.cadastrando = true
  }

  cancelaCadastro(){
    this.cadastrando = false
  }

  cadastrar(){

    const usuario: Usuario = new Usuario()

    usuario.username = this.username
    usuario.password = this.password

    this.authService.salvar(usuario)
    .subscribe(response => {

      this.mensagemSucesso = "Cadastro realizado com sucesso. Efetue o seu login!"
      this.errors = null

      this.username = null
      this.password = null
      this.cadastrando = false
      this.errors = null

    }, errorResponse => {

      this.mensagemSucesso = null
      this.errors = errorResponse.error.erros;
    })
  }
}
