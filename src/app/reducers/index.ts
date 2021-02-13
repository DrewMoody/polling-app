import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as activeUserReducer } from './active-user';
import { reducer as usersReducer } from './users';
import { reducer as questionReducer } from './question';
import { AppState } from '../models/state';

export const reducers: ActionReducerMap<AppState> = {
  activeUser: activeUserReducer,
  users: usersReducer,
  questions: questionReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
