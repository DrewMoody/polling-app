import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { questionAnswered, questionAsked } from '../actions/question';

@Injectable()
export class QuestionEffects {
  questionVotedFor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(questionAsked),
      tap((_) =>
        this.snackbar.open('Question created!', null, { duration: 2500 })
      ),
      tap((_) => this.router.navigateByUrl('')),
      map((_) => ({ type: '[Question] Snackbar Notification Question Added' }))
    )
  );

  questionAsked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(questionAnswered),
      tap((_) =>
        this.snackbar.open('Question answered!', null, { duration: 2500 })
      ),
      map((_) => ({
        type: '[Question] Snackbar Notification Question Answered',
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
}
