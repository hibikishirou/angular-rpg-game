import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreService } from './redux/store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'angular-rpg-game';
  constructor(private readonly storeService: StoreService) {
    this.storeService.initStore();
    this.storeService.storeManagement();
    this.storeService.handleStore();
  }
}
