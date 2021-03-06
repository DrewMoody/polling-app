import { Action, createReducer, on } from '@ngrx/store';
import * as QuestionActions from '../actions/question';
import { User } from '../models/user';
import { USERS } from '../constants/data';

export type State = Record<string, User>;

export const initialState: State = USERS;

const activeUserReducer = createReducer(
  initialState,
  on(
    QuestionActions.questionAnswered,
    (state, { userId, questionId, answerId }) => {
      return {
        ...state,
        [userId]: {
          ...state[userId],
          answers: {
            ...state[userId].answers,
            [questionId]: answerId,
          },
        },
      };
    }
  ),
  on(QuestionActions.questionAsked, (state, { question }) => {
    return {
      ...state,
      [question.author]: {
        ...state[question.author],
        questions: [...state[question.author].questions, question.id],
      },
    };
  })
);
export function reducer(state: State | undefined, action: Action) {
  return activeUserReducer(state, action);
}
