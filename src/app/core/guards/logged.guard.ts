import { Inject, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loggedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
Promise<boolean> |
boolean |
Promise<UrlTree> |
UrlTree => {
  return true; //inject(AuthService).logged ? inject(Router).createUrlTree(['/home']) : true;
};
