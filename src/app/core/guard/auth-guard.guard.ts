import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn } from '@angular/router';
import { UserService } from '../../redux/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate: CanActivateFn = (route, state) => {
    let result = false;
    this.userService.checkLogin().subscribe({
      next: (value) => {
        result = value;
      },
    });
    return result;
  };
}
