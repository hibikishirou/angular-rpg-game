import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DestroyComponent } from '../../core/destroy/destroy.component';
import { CharacterService } from '../../redux/character.service';
import { take, takeUntil } from 'rxjs';
import { Character } from '../../model/Character';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CharacterDetailComponent,
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent extends DestroyComponent {
  currentCharacter: Character | Partial<Character> = {};
  tempCharacter: Character | Partial<Character> = {};
  nameControl: FormControl = new FormControl('', [Validators.required]);
  constructor(
    private readonly characterService: CharacterService,
    private router: Router
  ) {
    super();
    this.getCharacter();
  }

  getCharacter() {
    this.characterService
      .getCharacter()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (character) => {
          this.currentCharacter = character as Character;
        },
      });
  }

  createCharater() {
    if (!this.nameControl.invalid) {
      const name = this.nameControl.getRawValue();
      const newCharacter = this.characterService.createCharater(name);
      this.tempCharacter = newCharacter;
    }
  }

  saveCharacter() {
    if (!this.tempCharacter || !this.tempCharacter.userId) {
      return;
    }
    this.characterService
      .saveCharacter(this.tempCharacter as Character)
      .pipe(take(1))
      .subscribe({
        next: (result) => {},
      });
  }
  deleteCharacter() {
    if (!this.currentCharacter || !this.currentCharacter.id) {
      return;
    }
    this.characterService
      .deleteCharacter(this.currentCharacter as Character)
      .pipe(take(1))
      .subscribe({
        next: (result) => {},
      });
  }
  playCharacter() {
    this.router.navigate(['/map']);
  }
}
