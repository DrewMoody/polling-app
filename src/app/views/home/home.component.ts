import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question';
import { AppState } from 'src/app/models/state';
import { UserQuestions } from 'src/app/models/user-questions';
import { selectQuestionsAnswered } from 'src/app/selectors/user-questions';

/**
 * Toggle between answered and unanswered polls
 * Arranged from most recently created to least recently created
 * Unanswered questions shown by default
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  userQuestions$: Observable<UserQuestions>;
  selectedQuestion: Question | null;

  constructor(private store: Store<AppState>, private router: Router) {
    this.userQuestions$ = store.select(selectQuestionsAnswered);
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
