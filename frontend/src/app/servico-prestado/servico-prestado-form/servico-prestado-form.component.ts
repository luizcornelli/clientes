import { ServicoPrestado } from './../servicoPrestado';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = []
  servicoPrestado: ServicoPrestado

  constructor(private clientesService: ClientesService) {

    this.servicoPrestado = new ServicoPrestado()
  }

  ngOnInit(): void {

    this.clientesService.getClientes()
      .subscribe(response => {
        this.clientes = response
      })
  }

  onSubmit(){
    console.log(this.servicoPrestado)
  }
}
