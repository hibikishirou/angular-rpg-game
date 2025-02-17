import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CharacterWindowComponent } from '../character/character-window/character-window.component';
import { DestroyComponent } from '../../core/destroy/destroy.component';
import {
  exhaustMap,
  fromEvent,
  map,
  merge,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { CharacterService } from '../../redux/character.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule, CharacterWindowComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent extends DestroyComponent implements AfterViewInit {
  @ViewChild('map') map?: ElementRef;
  private eventListener$: Subject<any> = new Subject();
  constructor(private readonly characterService: CharacterService) {
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
    const eventList = [this.seeMonster, this.seeItem, this.seeNothing];
    this.eventListener$
      .pipe(
        takeUntil(this.destroy$),
        exhaustMap((event) => {
          return of(eventList).pipe(
            map((arr) => arr[Math.floor(Math.random() * arr.length)])
          );
        })
      )
      .subscribe({
        next: (value) => {
          value();
        },
      });
  }

  seeMonster() {
    console.log('See monster');
    // this.characterService.receiveExp(
    //   this.characterService.randomStat(10, 20)
    // );
  }

  seeItem() {
    console.log('See item');
    // this.characterService.receiveExp(
    //   this.characterService.randomStat(10, 20)
    // );
  }

  seeNothing() {
    console.log('See nothing');
    // this.characterService.receiveExp(
    //   this.characterService.randomStat(10, 20)
    // );
  }
}
