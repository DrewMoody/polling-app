import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import { AppState } from '../models/state';
import { User } from '../models/user';
import { selectActiveUser } from '../selectors/active-user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate() {
    return this.store.select(selectActiveUser).pipe(
      first(),
      map((user) => !!this.isAuth(user) || this.router.parseUrl('/login'))
    );
  }

  isAuth(user: User | null) {
    return user != null;
  }
}
