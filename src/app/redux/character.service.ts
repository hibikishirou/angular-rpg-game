import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { Character } from '../model/Character';
import { RoleConfig } from '../constant/roleConfig';
import { UserService } from './user.service';
import User, { DisplayUser } from '../model/User';
import { IndexDBService } from '../core/index-db.service';

const CharacterStoreName = 'character';
@Injectable({
  providedIn: 'root',
})
export class CharacterService implements OnDestroy {
  private currentUser?: DisplayUser | null;
  private readonly character$: BehaviorSubject<Character | null> =
    new BehaviorSubject<Character | null>(null);
  private readonly destroy$ = new Subject();

  constructor(
    private readonly userService: UserService,
    private readonly indexDbService: IndexDBService
  ) {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  getUser() {
    this.userService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          this.getCharacterList();
        },
      });
  }

  getCharacter() {
    return this.character$.asObservable();
  }

  createCharater(name?: string) {
    const newCharacter: Character = {
      name: name || '',
      level: 1,
      userId: this.currentUser?.id,
      roleId: this.randomStat(1, RoleConfig.length),
      exp: 0,
      str: this.randomStat(1, 10),
      int: this.randomStat(1, 10),
      agi: this.randomStat(1, 10),
      vit: this.randomStat(1, 10),
      luck: this.randomStat(1, 10),
    };
    return newCharacter;
  }

  saveCharacter(character: Character) {
    const { id, userId } = character || {};
    if (!userId) {
      return throwError('Not have userId');
    }
    if (id) {
      return this.indexDbService.updateDb(CharacterStoreName, character).pipe(
        tap(() => {
          this.character$.next(character);
        })
      );
    } else {
      return this.indexDbService.addDb(CharacterStoreName, character).pipe(
        tap(() => {
          this.character$.next(character);
        })
      );
    }
  }

  deleteCharacter(character: Character) {
    const { id, userId } = character || {};
    if (!userId) {
      return throwError('Not have userId');
    }
    if (id) {
      return this.indexDbService.deleteDb(CharacterStoreName, id).pipe(
        take(1),
        switchMap((result) => {
          console.log(result);
          if (result) {
            this.character$.next(null);
            return of(true);
          }
          return throwError('Can not delete character');
        })
      );
    } else {
      return throwError('Not found character');
    }
  }

  gerRoleList() {
    return RoleConfig;
  }

  getCharacterList() {
    if (!this.currentUser) {
      return;
    }
    this.indexDbService
      .getByIndex(CharacterStoreName, 'userId', this.currentUser?.id)
      .pipe(take(1))
      .subscribe({
        next: (character) => {
          this.character$.next(character as Character);
        },
      });
  }

  randomStat(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomLevel(roleId: number) {}
}
