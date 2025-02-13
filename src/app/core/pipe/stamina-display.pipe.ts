import { Pipe, PipeTransform } from '@angular/core';
import { staminaCalculator } from '../../constant/caculator';
import { Character } from '../../model/Character';

@Pipe({
  name: 'staminaDisplay',
})
export class StaminaDisplayPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return staminaCalculator(value as Character);
  }
}
