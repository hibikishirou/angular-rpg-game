import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CharacterWindowComponent } from '../character/character-window/character-window.component';
import { DestroyComponent } from '../../core/destroy/destroy.component';
import { exhaustMap, fromEvent, of, takeUntil } from 'rxjs';
import { CharacterService } from '../../redux/character.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule, CharacterWindowComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent extends DestroyComponent implements AfterViewInit {
  @ViewChild('map') map?: ElementRef;
  constructor(private readonly characterService: CharacterService) {
    super();
  }

  ngAfterViewInit(): void {
    this.handleEvent();
  }

  handleEvent() {
    fromEvent(this.map?.nativeElement, 'click')
      .pipe(
        takeUntil(this.destroy$),
        exhaustMap((event) => {
          // console.log(event);
          this.characterService.receiveExp(
            this.characterService.randomStat(10, 20)
          );
          return of(event);
        })
      )
      .subscribe({
        next: (event) => {},
      });
  }
}
