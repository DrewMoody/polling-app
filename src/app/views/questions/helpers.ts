import { Question, QuestionOption } from 'src/app/models/question';
import { AppState } from 'src/app/models/state';
import { User } from 'src/app/models/user';
import { OPTION_ONE, OPTION_TWO } from '../../constants/options';
import { Options, QuestionInfo, QuestionsState } from './models';

type UserMap = Record<string, string>;

export const getUserMap = (users: User[]): UserMap => {
  return users.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {});
};

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
  totalVotes: number,
  userMap: UserMap
): QuestionInfo => {
  const votes = option.votes.length;
  const pct = totalVotes === 0 ? 0 : votes / totalVotes;
  return {
    optionId,
    text: option.text,
    votes,
    pct: Math.round(pct * 100),
    voters: option.votes.map((id) => userMap[id]).join(', '),
  };
};

export const getOptions = (
  question: Question,
  userMap: UserMap
): QuestionInfo[] => {
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  return [
    convertToQuestionInfo(OPTION_ONE, question.optionOne, totalVotes, userMap),
    convertToQuestionInfo(OPTION_TWO, question.optionTwo, totalVotes, userMap),
  ];
};

export function mapAppStateToQuestionState(
  state: AppState,
  questionId: string
): QuestionsState {
  const question = state.questions[questionId];
  const askingUser = state.users[state.questions[questionId].author];
  const activeUser = state.users[state.activeUser];
  /** Maps { id: name } */
  const userMap: Record<string, string> = getUserMap(
    Object.values(state.users)
  );
  return {
    askingUser,
    activeUser,
    activeUserAnswer: getActiveUserAnswer(state.activeUser, question),
    options: getOptions(question, userMap),
    questionId: question.id,
  };
}
