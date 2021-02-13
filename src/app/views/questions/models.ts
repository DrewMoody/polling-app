import { User } from 'src/app/models/user';
import { OPTION_ONE, OPTION_TWO } from '../../constants/options';

export type Options = typeof OPTION_ONE | typeof OPTION_TWO;

export interface QuestionInfo {
  optionId: Options;
  text: string;
  votes: number;
  pct: number;
}

export interface QuestionsState {
  askingUser: User;
  activeUser: User;
  activeUserAnswer: undefined | Options;
  options: QuestionInfo[];
  questionId: string;
}
