import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../redux/user.service';
import { startWith, take, takeUntil } from 'rxjs';
import { DestroyComponent } from '../../core/destroy/destroy.component';
import User, { DisplayUser } from '../../model/User';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  isLogin: boolean = false;
  user: DisplayUser | null = null;
  userForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  constructor(private readonly userSerive: UserService) {
    super();
    this.checkLogin();
  }

  checkLogin() {
    this.userSerive
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if (!value) {
            this.isLogin = false;
            return;
          }
          this.isLogin = true;
          this.user = value;
        },
      });
  }

  login() {
    const { username, password } = this.userForm.getRawValue();
    const user = this.userSerive.checkUser(username, password);
    if (user) {
      this.userSerive.saveUser(user);
    }
  }

  logout() {
    this.userSerive.clearUser();
  }
}
