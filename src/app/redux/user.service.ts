import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  find,
  of,
  ReplaySubject,
  switchAll,
  take,
  throwError,
} from 'rxjs';
import User, { DisplayUser } from '../model/User';
import { UserList } from '../constant/UserList';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly user$: BehaviorSubject<DisplayUser | null>;
  constructor() {
    this.user$ = new BehaviorSubject<DisplayUser | null>(null);
  }

  getUser() {
    return this.user$.asObservable();
  }

  saveUser(user: User) {
    if (user) {
      const { password, ...displayUser } = user;
      this.user$.next(displayUser);
    }
  }
  clearUser() {
    this.user$.next(null);
  }
  verifyUser(username: string, password: string, verifyPassword: string) {
    return this.checkUser(username, password) && password === verifyPassword;
  }

  checkUser(username: string, password: string) {
    let result;
    of(UserList)
      .pipe(
        take(1),
        switchAll(),
        find(
          ({ username: uName, password: uPass }) =>
            uName === username && uPass === password
        )
      )
      .subscribe({
        next: (user: User | undefined) => {
          result = user;
        },
        error: () => {},
        complete: () => {},
      });
    return result;
  }
}
