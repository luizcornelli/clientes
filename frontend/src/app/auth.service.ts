import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + "/usuarios"
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl
  clientId: string = environment.clientId
  clienteSecret: string = environment.clientSecret

  constructor(private http: HttpClient) { }

  salvar(usuario: Usuario): Observable<any> {

    return this.http.post<any>(this.apiURL, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {

    const params = new HttpParams().set("username", username)
      .set("password", password)
      .set('grant_type', 'password')

    const headers = {

      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clienteSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenURL, params.toString(), { headers })
  }

  isAuthenticated(): boolean{

    return true
  }
}
