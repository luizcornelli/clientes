import { ServicoPrestado } from './../servicoPrestado';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = []
  servicoPrestado: ServicoPrestado
  sucesso: boolean = false
  errors: String[]

  constructor(private clientesService: ClientesService,
    private servicoPrestadorService: ServicoPrestadoService) {

    this.servicoPrestado = new ServicoPrestado()
  }

  ngOnInit(): void {

    this.clientesService.getClientes()
      .subscribe(response => {
        this.clientes = response
      })
  }

  onSubmit(){
    this.servicoPrestadorService.salvar(this.servicoPrestado)
    .subscribe( response => {
      this.sucesso = true;
      this.errors = null;
      this.servicoPrestado = new ServicoPrestado()
    },
      errorResponse => {
        this.errors = errorResponse.error.erros;
        this.sucesso = false
    })
  }
}
