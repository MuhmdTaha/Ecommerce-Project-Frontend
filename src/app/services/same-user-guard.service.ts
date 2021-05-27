import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class SameUserGuardService implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.usersService.currentUser.id == route.paramMap.get('id'))
      return true;
    this.router.navigate(['/no-access']);
    return false;
  }
}
