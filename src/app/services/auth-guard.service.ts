import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
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

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectActiveUser).pipe(
      first(),
      map((user) => {
        if (!!this.isAuth(user)) {
          return true;
        } else {
          this.router.navigate(['/login'], {
            queryParams: { redirectURL: state.url },
          });
          return false;
        }
      })
    );
  }

  isAuth(user: User | null) {
    return user != null;
  }
}
