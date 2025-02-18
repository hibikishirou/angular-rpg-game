import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { Character, Stat } from '../model/Character';
import { RoleConfig, StatList } from '../constant/roleConfig';
import { UserService } from './user.service';
import { DisplayUser } from '../model/User';
import { IndexDBService } from '../core/index-db.service';

const CharacterStoreName = 'character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService implements OnDestroy {
  private currentUser?: DisplayUser | null;
  private readonly character$: BehaviorSubject<Partial<Character> | Character> =
    new BehaviorSubject<Partial<Character> | Character>({});
  private readonly destroy$ = new Subject();
  private readonly levelUpStat$: BehaviorSubject<Stat> =
    new BehaviorSubject<Stat>({ str: 0, int: 0, vit: 0, agi: 0, luck: 0 });
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
        switchMap(() => {
          this.character$.next(character);
          return of(true);
        })
      );
    } else {
      return this.indexDbService.addDb(CharacterStoreName, character).pipe(
        switchMap(() => {
          this.character$.next(character);
          return of(true);
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
          if (result) {
            this.character$.next({});
            return of(true);
          }
          return throwError('Can not delete character');
        })
      );
    } else {
      return throwError('Not found character');
    }
  }

  getRoleList() {
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

  receiveExp(exp: number) {
    this.character$.pipe(take(1)).subscribe((character) => {
      if (!character) {
        console.log('not found character');
        return;
      }
      const { exp: charExp = 0, roleId = 1 } = character as Character;
      if (charExp + exp < 100) {
        this.saveCharacter({
          ...(character as Character),
          exp: charExp + exp,
        })
          .pipe(take(1))
          .subscribe({ next: (result) => {} });
      } else {
        const newStat = this.randomLevel(roleId);
        if (!newStat) {
          console.log('error level up');
          return;
        }
        const {
          level = 0,
          str = 0,
          int = 0,
          agi = 0,
          vit = 0,
          luck = 0,
        } = character;

        this.saveCharacter({
          ...(character as Character),
          level: level + 1,
          exp: 0,
          str: str + newStat.str,
          int: int + newStat.int,
          agi: agi + newStat.agi,
          vit: vit + newStat.vit,
          luck: luck + newStat.luck,
        })
          .pipe(take(1))
          .subscribe({ next: (result) => {} });
        this.levelUpStat$.next(newStat);
      }
    });
  }

  randomStat(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomLevel(roleId: number): Stat | void {
    const currentRole = this.getRoleList().filter((item) => item.id === roleId);
    if (!currentRole.length) {
      console.log('not found role');
      return;
    }
    const rateList: Stat = {
      str: currentRole[0].rateStr,
      int: currentRole[0].rateInt,
      agi: currentRole[0].rateAgi,
      vit: currentRole[0].rateVit,
      luck: currentRole[0].rateLuck,
    };
    return StatList.reduce((data, key: string) => {
      const rate = rateList[key as keyof Stat];
      return {
        [key]: Math.random() < rate ? 0 : 1,
        ...data,
      };
    }, {} as Stat);
  }
}
