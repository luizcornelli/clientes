import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpCliente: HttpClient) { }

  salvar(cliente: Cliente): Observable<Cliente> {

    return this.httpCliente.post<Cliente>('http://localhost:8090/clientes', cliente)
  }

  getCliente(): Cliente {

    let cliente: Cliente = new Cliente()

    cliente.nome = 'Lulinha'
    cliente.cpf = '10822827409'

    return cliente
  }
}
