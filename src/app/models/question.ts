export interface QuestionOption {
  votes: string[];
  text: string;
}

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: QuestionOption;
  optionTwo: QuestionOption;
}
