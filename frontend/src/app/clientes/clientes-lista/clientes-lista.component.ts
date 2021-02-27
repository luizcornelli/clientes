import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = []
  clienteSelecionado: Cliente
  mensagemSucesso: string
  mensagemErro: string

  constructor(private clienteService: ClientesService,
    private router: Router) {


  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(response => this.clientes = response )
  }

  novoCadastro(): void{
    this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente
  }

  deletarCliente(){
    this.clienteService.deletar(this.clienteSelecionado)
      .subscribe(response => {
        this.mensagemSucesso = `Cliente${this.clienteSelecionado.nome}deletado com sucesso.`
        this.ngOnInit()
      }, erro => {
        this.mensagemErro = `Erro ao tentar deletar o Cliente: ${this.clienteSelecionado.nome}`
      })
  }
}
