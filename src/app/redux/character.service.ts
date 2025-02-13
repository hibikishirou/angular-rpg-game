import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character, TempCharacter } from '../model/Character';
import { RoleConfig } from '../constant/roleConfig';

const CharacterStoreName = 'character';
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly character$: BehaviorSubject<Character | null> =
    new BehaviorSubject<Character | null>(null);

  getCharacter() {
    return this.character$.asObservable();
  }

  createCharater(name?: string) {
    const newCharacter: TempCharacter = {
      name: name || '',
      level: 1,
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

  saveCharacter(character: Character) {}

  gerRoleList() {
    return RoleConfig;
  }

  changeRole(roleId: number) {}

  randomStat(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomLevel(roleId: number) {}
}
