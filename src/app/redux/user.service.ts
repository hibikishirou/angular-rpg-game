import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import User, { DisplayUser } from '../model/User';
import { IndexDBService } from '../core/index-db.service';

const UserStoreName = 'user';
@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private readonly user$: BehaviorSubject<DisplayUser | null> =
    new BehaviorSubject<DisplayUser | null>(null);
  private readonly isLogin$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private readonly error$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private readonly destroy$ = new Subject();
  constructor(private readonly idbService: IndexDBService) {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  getUser() {
    return this.user$.asObservable();
  }

  getUserError() {
    return this.error$.asObservable();
  }

  checkLogin() {
    return this.isLogin$.asObservable();
  }

  saveUser(user: User) {
    if (user) {
      const { password, ...displayUser } = user;
      this.isLogin$.next(true);
      this.user$.next(displayUser);
    }
  }

  clearUser() {
    this.user$.next(null);
    this.isLogin$.next(false);
  }

  registerUser(username: string, password: string, verifyPassword: string) {
    return this.checkUser(username).pipe(
      switchMap((result) => {
        if (result && password === verifyPassword) {
          return this.idbService.addDb(UserStoreName, { username, password });
        } else {
          if (password !== verifyPassword) {
            this.error$.next('Wrong Verify Password');
            return throwError(false);
          }
          this.error$.next('Exits User');
          return throwError(false);
        }
      })
    );
  }

  checkUser(username: string) {
    return this.idbService.getByIndex(UserStoreName, 'username', username).pipe(
      map((user) => {
        return !user;
      }),
      takeUntil(this.destroy$)
    );
  }

  checkUserLogin(username: string, password: string) {
    return this.idbService.getByIndex(UserStoreName, 'username', username).pipe(
      switchMap((user) => {
        const uPassword = (user as User).password;
        if (uPassword === password) {
          this.saveUser(user as User);
          return of(true);
        } else {
          this.error$.next('Not exits user');
          return throwError(false);
        }
      }),
      takeUntil(this.destroy$)
    );
  }
}
