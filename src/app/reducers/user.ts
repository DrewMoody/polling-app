import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user';
import { User } from '../models/user';
import { USERS } from './data';

export type State = User | null;

// TODO: Init to null
export const initialState: State = null;

const userReducer = createReducer(
  initialState,
  on(UserActions.signIn, (state, { user }) => user),
  on(UserActions.signOut, (state) => null)
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
