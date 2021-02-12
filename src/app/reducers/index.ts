import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Question } from '../models/question';
import { reducer as userReducer } from './user';
import { reducer as questionReducer } from './question';

export interface State {
  user: User;
  questions: Record<string, Question>;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  questions: questionReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
