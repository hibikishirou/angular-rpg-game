import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { CharacterService } from '../../redux/character.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterGuard implements CanActivate {
  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {}

  canActivate: CanActivateFn = (route, state) => {
    let result = false;
    this.characterService.getCharacter().subscribe({
      next: (value) => {
        result = !!value.id;
        if (!result) {
          this.router.navigate(['/character']);
        }
      },
    });
    return result;
  };
}
