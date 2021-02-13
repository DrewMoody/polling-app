import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user';

export type State = string | null;

export const initialState: State = null;

const activeUserReducer = createReducer(
  initialState,
  on(UserActions.signIn, (_, { user }) => user.id),
  on(UserActions.signOut, (_) => null)
);

export function reducer(state: State | undefined, action: Action) {
  return activeUserReducer(state, action);
}
