import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../../redux/user.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-main',
  imports: [RouterModule, MenuComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.redirect();
  }

  checkLogin() {
    return this.userService.checkLogin();
  }

  redirect() {
    this.checkLogin()
      .subscribe({
        next: (result) => {
          if (result) {
            this.router.navigate(['map']);
          } else {
            this.router.navigate(['user']);
          }
        },
      });
  }
}
