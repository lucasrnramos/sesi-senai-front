
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  constructor(private _authService: AuthService) {}

  get getNome(): string | null {
    return (this._authService.logged && typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('nome') : '';
  }

  get getIdPerfil(): string | null {
    return (this._authService.logged && typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('id_perfil') : '';
  }
}
