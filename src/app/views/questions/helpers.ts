import { Question, QuestionOption } from 'src/app/models/question';
import { AppState } from 'src/app/models/state';
import { OPTION_ONE, OPTION_TWO } from '../../constants/options';
import { Options, QuestionInfo, QuestionsState } from './models';

export const getActiveUserAnswer = (userId: string, question: Question) => {
  if (question.optionOne.votes.includes(userId)) {
    return OPTION_ONE;
  }
  if (question.optionTwo.votes.includes(userId)) {
    return OPTION_TWO;
  }
};

export const convertToQuestionInfo = (
  optionId: Options,
  option: QuestionOption,
  totalVotes: number
): QuestionInfo => {
  const votes = option.votes.length;
  const pct = totalVotes === 0 ? 0 : votes / totalVotes;
  return {
    optionId,
    text: option.text,
    votes,
    pct: Math.round(pct * 100),
  };
};

export const getOptions = (question: Question): QuestionInfo[] => {
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  return [
    convertToQuestionInfo(OPTION_ONE, question.optionOne, totalVotes),
    convertToQuestionInfo(OPTION_TWO, question.optionTwo, totalVotes),
  ];
};

export function mapAppStateToQuestionState(
  state: AppState,
  questionId: string
): QuestionsState {
  const question = state.questions[questionId];
  const askingUser = state.users[state.questions[questionId].author];
  const activeUser = state.users[state.activeUser];
  return {
    askingUser,
    activeUser,
    activeUserAnswer: getActiveUserAnswer(state.activeUser, question),
    options: getOptions(question),
    questionId: question.id,
  };
}
