import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase + '/clientes'

  constructor(private httpCliente: HttpClient) { }

  atualizar(cliente: Cliente): Observable<any> {

    return this.httpCliente.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente)
  }

  salvar(cliente: Cliente): Observable<Cliente> {

    return this.httpCliente.post<Cliente>(`${this.apiURL}/`, cliente)
  }

  getClientes(): Observable<Cliente[]> {

    return this.httpCliente.get<Cliente[]>(this.apiURL)
  }

  getClienteById(id: number): Observable<Cliente>{

    return this.httpCliente.get<any>(`${this.apiURL}/${id}`)
  }

  deletar(cliente: Cliente): Observable<any>{

    return this.httpCliente.delete<any>(`${this.apiURL}/${cliente.id}`)
  }
}
