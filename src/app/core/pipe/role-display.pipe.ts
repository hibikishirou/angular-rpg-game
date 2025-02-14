import { Pipe, PipeTransform } from '@angular/core';
import { CharacterService } from '../../redux/character.service';

@Pipe({
  name: 'roleDisplay',
})
export class RoleDisplayPipe implements PipeTransform {
  constructor(private readonly characterService: CharacterService) {}
  transform(value: unknown, ...args: unknown[]): unknown {
    const roleList = this.characterService.getRoleList();
    const result = roleList.find(item => item.id == value);
    return result?.name;
  }
}
