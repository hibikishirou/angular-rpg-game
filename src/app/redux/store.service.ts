import { Injectable, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import {
  BehaviorSubject,
  combineLatest,
  concatAll,
  forkJoin,
  map,
  merge,
  ReplaySubject,
  skip,
  Subject,
  switchAll,
  takeUntil,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnDestroy {
  private readonly store$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private readonly destroy$: Subject<any> = new Subject();
  constructor(private readonly userService: UserService) {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
  initStore() {
    const storeData = localStorage.getItem('store');
    const store = storeData ? JSON.parse(storeData) : {};
    this.store$.next(store);
    const { user } = store;
    this.userService.saveUser(user);
  }
  handleStore() {
    this.store$.pipe(skip(1), takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        const storeData = JSON.stringify(value);
        localStorage.setItem('store', storeData);
      },
      error: () => {},
      complete: () => {},
    });
  }
  storeManagement() {
    combineLatest([this.userService.getUser()])
      .pipe(
        map(([user]) => {
          return {
            user,
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => {
          this.store$.next(value);
        },
        error: () => {},
      });
  }
}
