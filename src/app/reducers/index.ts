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
import { AppState } from '../models/state';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  questions: questionReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
