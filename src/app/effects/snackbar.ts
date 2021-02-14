import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { questionAnswered, questionAsked } from '../actions/question';
import { signIn, signOut } from '../actions/user';

@Injectable()
export class SnackBarEffects {
  readonly duration: number = 2000;

  userSignOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOut),
        tap((_) =>
          this.snackbar.open('Signed out', null, { duration: this.duration })
        )
      ),
    {
      dispatch: false,
    }
  );

  userSignIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signIn),
        tap((user) => {
          this.snackbar.open(`Signed in as ${user.user.name}!`, null, {
            duration: this.duration,
          });
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
        tap((_) =>
          this.snackbar.open('Question created!', null, {
            duration: this.duration,
          })
        )
      ),
    {
      dispatch: false,
    }
  );

  questionAsked$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(questionAnswered),
        tap((_) =>
          this.snackbar.open('Answer submitted!', null, {
            duration: this.duration,
          })
        )
      ),
    {
      dispatch: false,
    }
  );

  constructor(private actions$: Actions, private snackbar: MatSnackBar) {}
}
