import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { CharacterWindowComponent } from '../character/character-window/character-window.component';
import { DestroyComponent } from '../../core/destroy/destroy.component';
import { exhaustMap, fromEvent, map, of, Subject, takeUntil, tap } from 'rxjs';
import { CharacterService } from '../../redux/character.service';
import { MapService } from '../../redux/map.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from '../../redux/message.service';
@Component({
  selector: 'app-map',
  imports: [CommonModule, CharacterWindowComponent, MatSnackBarModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent extends DestroyComponent implements AfterViewInit {
  @ViewChild('map') map?: ElementRef;
  private eventListener$: Subject<any> = new Subject();
  constructor(
    private readonly characterService$: CharacterService,
    private readonly mapService$: MapService,
    private readonly messageService$: MessageService
  ) {
    super();
    this.initMapEvent();
  }

  ngAfterViewInit(): void {
    this.handleEvent();
  }

  handleEvent() {
    fromEvent(this.map?.nativeElement, 'click')
      .pipe(
        takeUntil(this.destroy$),
        exhaustMap((event) => {
          this.eventListener$.next(1);
          return of(event);
        })
      )
      .subscribe({
        next: (event) => {},
      });
  }

  initMapEvent() {
    const eventList = ['see_monster', 'see_item'];
    this.eventListener$
      .pipe(
        takeUntil(this.destroy$),
        exhaustMap((event) => {
          return of(eventList).pipe(
            map((arr) => arr[Math.floor(Math.random() * (arr.length + 1))])
          );
        }),
        tap(() => {
          this.mapService$.statChange('stamina', -10);
        })
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          switch (value) {
            case 'see_monster': {
              this.seeMonster();
              break;
            }
            case 'see_item': {
              this.seeItem();
              break;
            }
            default: {
              this.seeNothing();
              break;
            }
          }
        },
      });
  }

  seeMonster() {
    const random = this.characterService$.randomStat(10, 20);
    const exp = this.characterService$.randomStat(10, 20);
    this.mapService$.statChange('hp', -1 * random);
    this.characterService$.receiveExp(exp);
    this.messageService$.showMessage(`You see the monster, lost ${random}hp, take ${exp}exp`);
  }

  seeItem() {
    this.mapService$.statChange('hp', 10);
    this.messageService$.showMessage('You see the potion, cure 10hp');
  }

  seeNothing() {
    this.messageService$.showMessage('Nothing happen');
  }
}
