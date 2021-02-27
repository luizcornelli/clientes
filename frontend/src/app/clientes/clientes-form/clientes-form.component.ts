import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  id: number

  constructor(private clienteService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { this.cliente = new Cliente() }

  ngOnInit(): void {

    let params: Observable<Params> = this.activatedRoute.params;

    params.subscribe( urlParams => {

      this.id = urlParams['id']

      if(this.id) {
        this.clienteService.getClienteById(this.id)
          .subscribe(
            response => this.cliente = response,
            errorResponse => this.cliente = new Cliente() )
      }
    } )
  }

  onSubmit() {

   if(this.id){

    this.clienteService.atualizar(this.cliente)
      .subscribe(response => {
        this.sucesso = true;
        this.errors = null;
      }, errorResponse => {
        this.errors = ['Erro ao atualizar o cliente.']
      })

   }else {
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

  voltarParaListagem(): void {
    this.router.navigate(['/clientes/lista'])
  }


}
