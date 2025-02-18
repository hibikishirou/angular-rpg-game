import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../../redux/user.service';
import { CommonModule } from '@angular/common';
import { of, switchMap, takeUntil } from 'rxjs';
import { CharacterService } from '../../redux/character.service';
import { DestroyComponent } from '../../core/destroy/destroy.component';

@Component({
  selector: 'app-main',
  imports: [RouterModule, MenuComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent extends DestroyComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly characterService: CharacterService,
    private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.redirect();
  }
  redirect() {
    this.userService
      .checkLogin()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result) => {
          if (!result) {
            this.router.navigate(['user']);
            return of(false);
          }
          return this.characterService.getCharacter();
        })
      )
      .subscribe({
        next: (result) => {
        },
      });
  }
}
