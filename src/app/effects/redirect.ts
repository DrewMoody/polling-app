import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { questionAsked } from '../actions/question';
import { signIn, signOut } from '../actions/user';

@Injectable()
export class RedirectEffects {
  userSignOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOut),
        tap((_) => this.router.navigateByUrl('login'))
      ),
    {
      dispatch: false,
    }
  );

  userSignIn$ = createEffect(
    () =>
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
        })
      ),
    {
      dispatch: false,
    }
  );

  questionVotedFor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(questionAsked),
        tap((_) => this.router.navigateByUrl(''))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
