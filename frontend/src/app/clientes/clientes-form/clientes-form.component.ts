import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente
  sucesso: boolean = false
  errors: String[]

  constructor(private clienteService: ClientesService) { this.cliente = new Cliente() }

  ngOnInit(): void {
  }

  onSubmit() {

    this.clienteService.salvar(this.cliente)
      .subscribe( response => {
        this.sucesso = true;
        this.errors = null;
        this.cliente = response;
      },
        errorResponse => {
          this.errors = errorResponse.error.erros;
          this.sucesso = false
      })
  }
}
