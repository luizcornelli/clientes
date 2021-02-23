import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpCliente: HttpClient) { }

  atualizar(cliente: Cliente): Observable<any> {

    return this.httpCliente.put<Cliente>(`http://localhost:8090/clientes/${cliente.id}`, cliente)
  }

  salvar(cliente: Cliente): Observable<Cliente> {

    return this.httpCliente.post<Cliente>('http://localhost:8090/clientes', cliente)
  }

  getClientes(): Observable<Cliente[]> {

    return this.httpCliente.get<Cliente[]>('http://localhost:8090/clientes')
  }

  getClienteById(id: number): Observable<Cliente>{

    return this.httpCliente.get<any>(`http://localhost:8090/clientes/${id}`)
  }
}
