import { Injectable, OnDestroy } from '@angular/core';
import { CharacterService } from './character.service';
import { Character, MapCharacter } from '../model/Character';
import {
  BehaviorSubject,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import caculator from '../constant/caculator';

@Injectable({
  providedIn: 'root',
})
export class MapService implements OnDestroy {
  private readonly destoy$ = new Subject();
  private readonly character$: BehaviorSubject<MapCharacter | null> =
    new BehaviorSubject<MapCharacter | null>(null);
  private readonly message$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  constructor(private characterService: CharacterService) {
    this.characterControl();
    this.handleCharacter();
  }
  ngOnDestroy(): void {
    this.destoy$.next(null);
    this.destoy$.complete();
  }

  getCharacter() {
    return this.character$.asObservable();
  }

  initCharacter(character: Character) {
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
  characterControl() {
    this.characterService
      .getCharacter()
      .pipe(takeUntil(this.destoy$), distinctUntilKeyChanged('level'))
      .subscribe({
        next: (character) => {
          if (!character || !character.id) {
            return;
          }
          this.initCharacter(character as Character);
        },
      });
    this.characterService
      .getCharacter()
      .pipe(takeUntil(this.destoy$), distinctUntilKeyChanged('exp'))
      .subscribe({
        next: (character) => {
          if (!character || !character.id) {
            return;
          }
          const { exp = 0 } = character;
          const mapCharacter = this.character$.getValue() as MapCharacter;
          this.character$.next({
            ...mapCharacter,
            exp: exp,
          });
        },
      });
  }
  handleCharacter() {
    this.character$
      .pipe(takeUntil(this.destoy$), distinctUntilChanged())
      .subscribe({
        next: (character) => {
          if (!character) {
            return;
          }
          const { hp, stamina } = character;
          if (hp === 0) {
            console.log('You die');
            this.message$.next('You Die');
            this.character$.next({
              ...character,
              hp: character.maxHp,
            });
          }
          if (stamina === 0) {
            console.log(`You don't have enough stamina`);
            this.message$.next(`You don't have enough stamina`);
            this.character$.next({
              ...character,
              stamina: character.maxStamina,
            });
          }
        },
      });
  }

  resetStat(type: 'hp' | 'mp' | 'stamina') {
    this.character$.pipe(take(1)).subscribe({
      next: (character) => {
        if (!character) {
          return;
        }
        this.character$.next({
          ...character,
          [type]:
            character[
              `max${
                String(type).charAt(0).toUpperCase() + String(type).slice(1)
              }` as keyof MapCharacter
            ],
        });
      },
    });
  }

  statChange(type: 'hp' | 'mp' | 'stamina', value: number) {
    this.character$.pipe(take(1)).subscribe({
      next: (character) => {
        if (!character) {
          return;
        }
        const maxStat = character[
          `max${
            String(type).charAt(0).toUpperCase() + String(type).slice(1)
          }` as keyof MapCharacter
        ] as number;
        const newStat = character[type] + value;
        if (newStat > maxStat) {
          return;
        }
        if (newStat > 0) {
          this.character$.next({
            ...character,
            [type]: newStat,
          });
        } else {
          this.character$.next({
            ...character,
            [type]: 0,
          });
        }
      },
    });
  }
}
