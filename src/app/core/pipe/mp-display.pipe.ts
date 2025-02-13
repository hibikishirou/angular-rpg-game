import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../../model/Character';
import { mpCalculator } from '../../constant/caculator';

@Pipe({
  name: 'mpDisplay',
})
export class MpDisplayPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return mpCalculator(value as Character);
  }
}
