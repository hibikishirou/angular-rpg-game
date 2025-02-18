import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../redux/user.service';
import { takeUntil } from 'rxjs';
import { DestroyComponent } from '../../core/destroy/destroy.component';
import { DisplayUser } from '../../model/User';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent extends DestroyComponent {
  isLogin = false;
  isRegister = false;
  user: DisplayUser | null = null;
  error: string = '';
  userForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  userRegisterForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    verifyPassword: new FormControl(),
  });
  constructor(private readonly userSerive: UserService, private router: Router) {
    super();
    this.checkLogin();
    this.checkError();
  }

  checkLogin() {
    this.userSerive
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if (!value) {
            return;
          }
          this.user = value;
        },
      });

    this.userSerive
      .checkLogin()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (val) => {
          this.isLogin = val;
        },
      });
  }

  checkError() {
    this.userSerive
      .getUserError()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (error) => {
          this.error = error;
        },
      });
  }

  login() {
    const { username, password } = this.userForm.getRawValue();
    this.userSerive.checkUserLogin(username, password).subscribe({
      next: (result) => {
        if (result) {
          this.userForm.reset();
          this.router.navigate(['/character']);
        }
      },
      error: (err) => {},
    });
  }

  register() {
    const { username, password, verifyPassword } =
      this.userRegisterForm.getRawValue();
    this.userSerive.registerUser(username, password, verifyPassword).subscribe({
      next: (result) => {
        if (result) {
          this.userRegisterForm.reset();
          this.isRegister = false;
        }
      },
      error: (err) => {},
    });
  }

  logout() {
    this.userSerive.clearUser();
  }
}
