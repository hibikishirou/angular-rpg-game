import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../redux/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    let result = false;
    this.userService.checkLogin().subscribe({
      next: (value) => {
        result = value;
        if (!result) {
          this.router.navigate(['/user']);
        }
      },
    });
    return result;
  };
}
