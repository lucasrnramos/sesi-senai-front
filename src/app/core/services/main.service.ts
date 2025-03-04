/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../../shared/interfaces/system/system-interfaces';
import { ResponseConvites, ResponseEmailConvite, ResponsePerfis } from '../../shared/interfaces/responses/response';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(
    @Inject(PLATFORM_ID) private platformID: object,
    private _http: HttpClient
  ) { }

  public getPerfis(): Observable<ResponsePerfis> {
    const URL = 'http://localhost:80/api/perfis';
    return this._http.get<ResponsePerfis>(URL);
  }

  public postCriarPerfil(perfil: string): Observable<unknown> {
    const URL = 'http://localhost:80/api/perfis/criar';
    const PARAMS: HttpParams = new HttpParams()
      .set('status', 'A')
      .set('perfil', perfil);

    return this._http.post<unknown>(URL, PARAMS);
  }

  public postCriarConvite(email: string): Observable<unknown> {
    const URL = 'http://localhost:80/api/convite/criar';
    const PARAMS: HttpParams = new HttpParams()
      .set('email', email);

    return this._http.post<unknown>(URL, PARAMS);
  }

  public postCadastrarColaborador(dadosColaborador: Colaborador): Observable<unknown> {
    const URL = 'http://localhost:80/api/cadastrar';
    const PARAMS: HttpParams = new HttpParams()
    .set('nome', dadosColaborador.nome)
    .set('email', dadosColaborador.email)
    .set('id_perfil', dadosColaborador.id_perfil)
    .set('cpf', dadosColaborador.cpf)
    .set('celular', dadosColaborador.celular || '')
    .set('cep', dadosColaborador.cep || '')
    .set('uf', dadosColaborador.uf || '')
    .set('localidade', dadosColaborador.localidade || '')
    .set('bairro', dadosColaborador.bairro || '')
    .set('logradouro', dadosColaborador.logradouro || '')
    .set('senha', dadosColaborador.senha);

    return this._http.post<unknown>(URL, PARAMS);
  }

  public postRecuperarSenha(hash: string, senha: string): Observable<unknown> {
    const URL = 'http://localhost:80/api/login/redefinir';
    const PARAMS: HttpParams = new HttpParams()
      .set('hash', hash)
      .set('senha', senha);

    return this._http.post<unknown>(URL, PARAMS);
  }

  public getEmailRecuperarSenha(email: string): Observable<unknown> {
    const URL = `http://localhost:80/api/convite/redefinir/${email}`;
    const PARAMS: HttpParams = new HttpParams()
      .set('email', email);

    return this._http.get<unknown>(URL, {params: PARAMS});
  }

  public patchEditarPerfil(cpf: string, id: number): Observable<unknown> {
    const URL = `http://localhost:80/api/perfis/editar/${cpf}/${id}`;
    const PARAMS: HttpParams = new HttpParams()
      .set('cpf', cpf)
      .set('id_perfil', id);

    return this._http.patch<unknown>(URL, PARAMS);
  }

  public getConvites(): Observable<ResponseConvites> {
    const URL = 'http://localhost:80/api/convite';
    return this._http.get<ResponseConvites>(URL);
  }

  public getEmailConvites(hash: string): Observable<ResponseEmailConvite> {
    const URL = `http://localhost:80/api/cadastrar/buscar/${hash}`;
    return this._http.get<ResponseEmailConvite>(URL);
  }
}
