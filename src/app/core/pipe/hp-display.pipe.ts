import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../../model/Character';
import { hpCalculator } from '../../constant/caculator';

@Pipe({
  name: 'hpDisplay',
})
export class HpDisplayPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return hpCalculator(value as Character);
  }
}
