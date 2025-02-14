import { Injectable, OnDestroy } from '@angular/core';
import { CharacterService } from './character.service';
import { MapCharacter } from '../model/Character';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import caculator from '../constant/caculator';

@Injectable({
  providedIn: 'root',
})
export class MapService implements OnDestroy {
  private readonly destoy$ = new Subject();
  private readonly character$: BehaviorSubject<MapCharacter | null> =
    new BehaviorSubject<MapCharacter | null>(null);

  constructor(private characterService: CharacterService) {
    this.initCharacter();
  }
  ngOnDestroy(): void {
    this.destoy$.next(null);
    this.destoy$.complete();
  }

  getCharacter() {
    return this.character$.asObservable();
  }

  initCharacter() {
    this.characterService
      .getCharacter()
      .pipe(takeUntil(this.destoy$))
      .subscribe({
        next: (character) => {
          if (character) {
            this.character$.next({
              hp: caculator.hpCalculator(character),
              maxHp: caculator.hpCalculator(character),
              mp: caculator.mpCalculator(character),
              maxMp: caculator.mpCalculator(character),
              stamina: caculator.staminaCalculator(character),
              maxStamina: caculator.staminaCalculator(character),
              ...character,
            });
          }
        },
      });
  }
}
