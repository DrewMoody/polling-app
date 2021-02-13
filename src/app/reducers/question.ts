import { Action, createReducer, on } from '@ngrx/store';
import * as QuestionActions from '../actions/question';
import { Question } from '../models/question';
import { QUESTIONS } from '../constants/data';

export type State = Record<string, Question>;

export const initialState: State = QUESTIONS;

const questionReducer = createReducer(
  initialState,
  on(QuestionActions.questionAsked, (state, { question }) => {
    return {
      ...state,
      [question.id]: question,
    };
  }),
  on(
    QuestionActions.questionAnswered,
    (state, { userId, questionId, answerId }) => {
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answerId]: {
            ...state[questionId][answerId],
            votes: [...state[questionId][answerId].votes, userId],
          },
        },
      };
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return questionReducer(state, action);
}
