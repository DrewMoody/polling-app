import { Question } from './question';
import { User } from './user';

export interface AppState {
  activeUser: null | string;
  users: Record<string, User>;
  questions: Record<string, Question>;
}
