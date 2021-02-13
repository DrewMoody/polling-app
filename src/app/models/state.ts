import { Question } from './question';
import { User } from './user';

export interface AppState {
  user: User;
  questions: Record<string, Question>;
}
