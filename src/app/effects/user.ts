import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { signIn, signOut } from '../actions/user';

@Injectable()
export class UserEffects {
  userSignOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      tap((_) => this.router.navigateByUrl('login')),
      tap((_) => this.snackbar.open('Signed out!', null, { duration: 2500 })),
      map((_) => ({ type: '[User] Redirected to login' }))
    )
  );

  userSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      tap((_) => {
        const params = this.route.snapshot.queryParams;
        let redirectURL: string | undefined = params['redirectURL'];

        if (redirectURL) {
          this.router
            .navigateByUrl(redirectURL)
            .catch(() => this.router.navigateByUrl('/'));
        } else {
          this.router.navigateByUrl('/');
        }
      }),
      tap((user) => {
        this.snackbar.open(`Signed in as ${user.user.name}!`, null, {
          duration: 2500,
        });
      }),
      map(() => ({ type: '[User] Redirected after login' }))
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}
}
