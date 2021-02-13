import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { questionAsked } from 'src/app/actions/question';
import { Question } from 'src/app/models/question';
import { AppState } from 'src/app/models/state';
import { v4 } from 'uuid';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddQuestionComponent implements OnInit {
  questionForm: FormGroup;
  private author: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.questionForm = new FormGroup({
      optionOne: new FormControl('', [Validators.required]),
      optionTwo: new FormControl('', [Validators.required]),
    });

    this.store
      .select('activeUser')
      .pipe(first())
      .subscribe((activeUser) => (this.author = activeUser));
  }

  ngOnInit(): void {}

  // TODO: snackbar and router stuff should be handle with effects!
  onSubmit() {
    const { optionOne, optionTwo } = this.questionForm.value;
    const question: Question = {
      id: v4(),
      author: this.author,
      timestamp: Date.now(),
      optionOne: {
        text: optionOne,
        votes: [],
      },
      optionTwo: {
        text: optionTwo,
        votes: [],
      },
    };
    this.store.dispatch(questionAsked({ question }));

    this.snackbar.open('Question added successfully!', null, {
      duration: 2500,
    });

    this.router.navigateByUrl('');
  }
}
