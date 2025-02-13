import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../../redux/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [RouterModule, MenuComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private readonly userService: UserService) {}

  checkLogin() {
    return this.userService.checkLogin();
  }
}
