import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBank, ResponseUF } from '../../../shared/interfaces/responses/external-apis/external-api-responses';

@Injectable({
  providedIn: 'root'
})
export class ExternalAPIService {

  constructor(
    private _http: HttpClient
  ) { }

  public getEndereco(cep: string): Observable<any> {
    const VIA_CEP = `https://viacep.com.br/ws/${cep}/json/`;
    return this._http.get<any>(VIA_CEP);
  }

  public get states(): Observable<ResponseUF> {
    const URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

    return this._http.get<ResponseUF>(URL);
  }

  public cities(uf: number): Observable<any> {
    const OBTER_LISTA_DE_MUNICIPIOS = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

    return this._http.get<any>(OBTER_LISTA_DE_MUNICIPIOS);
  }

  public bankList(): Observable<ResponseBank> {
    const URL = `https://olinda.bcb.gov.br/olinda/servico/CCR/versao/v1/odata/InstituicoesFinanceirasAutorizadas?$filter=Pais%20eq%20'Brasil'&$orderby=Nome%20asc&$format=json`;

    return this._http.get<any>(URL);
  }

  public ufs(): Observable<unknown> {
    const URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

    // const PARAMS: HttpParams = new HttpParams()
    //   .set('cpf', cpf);

    return this._http.get<unknown>(URL);
    // return this._http.post<unknown>(URL, PARAMS);
  }
}
