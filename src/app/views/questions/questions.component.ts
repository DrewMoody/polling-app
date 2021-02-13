import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/models/state';
import { Observable } from 'rxjs';
import { QuestionsState } from './models';
import { mapAppStateToQuestionState } from './helpers';
import { questionAnswered } from 'src/app/actions/question';
import { MatSnackBar } from '@angular/material/snack-bar';

const isNil = (param: any) => param == null;

// TODO: Convert to selector fn
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  readonly canGoBack: boolean;
  private submissionInformation: { userId: string; questionId: string };
  questionState$: Observable<QuestionsState>;
  selectedOptionId?: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: MatSnackBar
  ) {
    this.questionState$ = route.params.pipe(
      map((route) => route.questionId),
      first(),
      switchMap((questionId) =>
        store.pipe(
          map((state) => mapAppStateToQuestionState(state, questionId)),
          tap(
            (state) =>
              (this.submissionInformation = {
                userId: state.activeUser.id,
                questionId,
              })
          )
        )
      )
    );

    const { navigationId } = this.location.getState() as {
      navigationId?: number;
    };
    this.canGoBack = navigationId > 1;
  }

  ngOnInit(): void {}

  onGoBack() {
    if (!!this.canGoBack) {
      this.location.back();
    }
  }

  selectOption(optionId: string) {
    this.selectedOptionId = optionId;
  }

  onSubmit() {
    const { userId, questionId } = this.submissionInformation;
    const answerId = this.selectedOptionId;

    if (isNil(userId) || isNil(questionId) || isNil(answerId)) {
      return;
    }

    const answer = { userId, questionId, answerId };

    this.store.dispatch(questionAnswered(answer));

    this.snackbar.open('Vote added successfully!', null, {
      duration: 2500,
    });
  }
}
