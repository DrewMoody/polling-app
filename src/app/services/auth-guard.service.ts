import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, tap } from 'rxjs/operators';
import { AppState } from '../models/state';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate() {
    console.log('CHECKING');
    return this.store.select('user').pipe(
      first(),
      tap(console.log),
      map((user) => !!this.isAuth(user) || this.router.parseUrl('/login'))
    );
  }

  isAuth(user: User | null) {
    return user != null;
  }
}
