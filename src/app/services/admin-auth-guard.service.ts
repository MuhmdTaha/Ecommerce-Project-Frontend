import { Injectable } from '@angular/core';
import { Router } from '@angular/router';  
import { CanActivate } from '@angular/router';  
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router, private usersService: UsersService) { }
  canActivate() {
    let user = this.usersService.currentUser;  
    if(user && user.isAdmin)
      return true;
    this.router.navigate(['/no-access']);
      return false;
  }
  CheckAdminOrNot() {
    let user = this.usersService.currentUser;  
    if(user && user.isAdmin)
      return true;
    
    return false;
  }
}