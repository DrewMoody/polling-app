import { createSelector } from '@ngrx/store';
import { AppState } from '../models/state';
import { User } from '../models/user';

export const selectActiveUserId = (state: AppState) => state.activeUser;
export const selectUsers = (state: AppState) => state.users;

export const selectActiveUser = createSelector(
  selectActiveUserId,
  selectUsers,
  (activeUserId: string | null, users: Record<string, User>) =>
    users[activeUserId] || null
);
