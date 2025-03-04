import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const routeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
Promise<boolean> |
boolean |
Promise<UrlTree> |
UrlTree => {
  return true; //inject(AuthService).logged ? true : inject(Router).createUrlTree(['/auth/login']);
};
