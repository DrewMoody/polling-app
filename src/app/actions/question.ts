import { createAction, props } from '@ngrx/store';
import { Question, QuestionOption } from '../models/question';

export const questionAsked = createAction(
  '[Question] Question Asked',
  props<{ question: Question }>()
);
export const questionAnswered = createAction(
  '[Question] Question Answered',
  props<{ userId: string; questionId: string; answerId: string }>()
);
