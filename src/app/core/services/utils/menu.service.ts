import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private _router: Router) { }

  public extractMenuOf(route: string): Routes {
    const BASE = this._router.config.filter(base => base.path === route);

    const ROUTES = BASE[0].children;

    if(ROUTES && ROUTES.length > 0) {
      return ROUTES;
    }

    return [];
  }

}
