import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-destroy',
  imports: [],
  templateUrl: './destroy.component.html',
  styleUrl: './destroy.component.scss',
})
export class DestroyComponent implements OnDestroy {
  destroy$: Subject<any> = new Subject();
  constructor() {}
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
