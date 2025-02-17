import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../../redux/user.service';
import { CommonModule } from '@angular/common';
import { forkJoin, takeUntil } from 'rxjs';
import { CharacterService } from '../../redux/character.service';
import { DestroyComponent } from '../../core/destroy/destroy.component';

@Component({
  selector: 'app-main',
  imports: [RouterModule, MenuComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent extends DestroyComponent {
  constructor(
    private readonly userService: UserService,
    private readonly characterService: CharacterService,
    private router: Router
  ) {
    super();
    this.redirect();
  }

  redirect() {
    this.userService
      .checkLogin()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result) {
            this.router.navigate(['character']);
          } else {
            this.router.navigate(['user']);
          }
        },
      });
  }
}
