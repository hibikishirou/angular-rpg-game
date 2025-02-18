import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CharacterWindowComponent } from '../character/character-window/character-window.component';
import { DestroyComponent } from '../../core/destroy/destroy.component';
import {
  exhaustMap,
  finalize,
  fromEvent,
  map,
  merge,
  of,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { CharacterService } from '../../redux/character.service';
import { MapService } from '../../redux/map.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule, CharacterWindowComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent extends DestroyComponent implements AfterViewInit {
  @ViewChild('map') map?: ElementRef;
  private eventListener$: Subject<any> = new Subject();
  constructor(
    private readonly characterService: CharacterService,
    private readonly mapService: MapService
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
          this.mapService.statChange('stamina', -10);
        })
      )
      .subscribe({
        next: (value) => {
          switch (value) {
            case 'see_monster': {
              this.seeMonster();
              break;
            }
            case 'see_item': {
              this.seeMonster();
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
    this.mapService.statChange('hp', -10);
    this.characterService.receiveExp(
      this.characterService.randomStat(10, 20)
    );
  }

  seeItem() {
    this.mapService.statChange('hp', 10);
    // this.characterService.receiveExp(
    //   this.characterService.randomStat(10, 20)
    // );
  }

  seeNothing() {
    // this.characterService.receiveExp(
    //   this.characterService.randomStat(10, 20)
    // );
  }
}
