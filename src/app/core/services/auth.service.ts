import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginData } from '../../shared/interfaces/system/system-interfaces';
import { ResponseLogin } from '../../shared/interfaces/responses/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API: string = "http://localhost:80/api/login";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(loginData: LoginData): Observable<ResponseLogin> {
    const PARAMS = new HttpParams()
      .set("cpf", loginData.cpf)
      .set("senha", loginData.senha);

    return this.http.post<ResponseLogin>(this.API, PARAMS).pipe(
      tap(response => {
        sessionStorage.setItem('id_perfil', response.object.id_perfil.toString());
        sessionStorage.setItem('nome', response.object.nome);
        this.router.navigate(['main/home']);
      })
    );
  }

  public logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  get logged() {
    return (typeof sessionStorage !== 'undefined') ? (sessionStorage.getItem('id_perfil') ? true : false) : false;
  }

  get getUserName(): string | null {
    return (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('nomeUsuario') : 'Usuário';
  }

  get getuserProfilePhoto() {
    return;
  }
}
