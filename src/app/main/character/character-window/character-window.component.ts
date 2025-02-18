import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MapService } from '../../../redux/map.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RoleDisplayPipe } from '../../../core/pipe/role-display.pipe';

@Component({
  selector: 'app-character-window',
  imports: [
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    RoleDisplayPipe,
  ],
  templateUrl: './character-window.component.html',
  styleUrl: './character-window.component.scss',
})
export class CharacterWindowComponent {
  constructor(private readonly mapService: MapService) {}

  getMapCharacter() {
    return this.mapService.getCharacter();
  }
}
