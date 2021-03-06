import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/models/question';
import { AppState } from 'src/app/models/state';
import { UserQuestions } from 'src/app/models/user-questions';
import { selectActiveUserId } from 'src/app/selectors/active-user';
import { selectQuestionsAnswered } from 'src/app/selectors/user-questions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  userQuestions$: Observable<{
    activeUserId: string;
    questions: UserQuestions;
  }>;
  selectedQuestion: Question | null;

  constructor(private store: Store<AppState>, private router: Router) {
    this.userQuestions$ = combineLatest([
      store.select(selectActiveUserId),
      store.select(selectQuestionsAnswered),
    ]).pipe(map(([activeUserId, questions]) => ({ activeUserId, questions })));
  }

  ngOnInit(): void {}

  userQuestionsSort(
    a: KeyValue<string, UserQuestions>,
    b: KeyValue<string, UserQuestions>
  ) {
    return b.key === 'answered' ? -1 : 0;
  }

  setSelectedQuestion(question: Question | null) {
    this.selectedQuestion = question;
  }

  onViewQuestion() {
    if (!this.selectedQuestion) {
      return;
    }

    this.router.navigateByUrl(`/questions/${this.selectedQuestion.id}`);
  }
}
