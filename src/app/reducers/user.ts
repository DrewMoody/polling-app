import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user';
import { User } from '../models/user';

export type State = User | null;

export const initialState: State = null;

const userReducer = createReducer(
  initialState,
  on(UserActions.signOut, (state) => null),
  on(UserActions.signIn, (state, { user }) => user)
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
