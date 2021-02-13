import { Question } from './question';

export interface UserQuestions {
  answered: Question[];
  unanswered: Question[];
}
