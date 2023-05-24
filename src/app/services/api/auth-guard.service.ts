import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppUserService } from './app-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AppUserService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('this.auth.isLoggedIn()', this.auth.isLoggedIn());
    if (!this.auth.isLoggedIn()) {
      this.router.navigate([
        '/tabs/profil/login',
        {
          snapshot: state.url,
        },
      ]);
      return false;
    }
    return true;
  }
}
