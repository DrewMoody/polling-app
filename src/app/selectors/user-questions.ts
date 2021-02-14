import {
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
} from '@ngrx/store';
import { Question } from '../models/question';
import { AppState } from '../models/state';
import { UserQuestions } from '../models/user-questions';
import { selectActiveUserId } from './active-user';

/**
 * HELPER FNS FOR COMPOSING SELECT
 */
const getQuestionsArr = (questions: Record<string, Question>) => {
  return Object.values(questions).sort((a, b) => b.timestamp - a.timestamp);
};

const groupByAnswered = (userId: string) => (question: Question) =>
  [...question.optionOne.votes, ...question.optionTwo.votes].includes(userId)
    ? 'answered'
    : 'unanswered';

function groupBy<T, K extends string | number>(
  data: T[],
  groupByFn: (entry: T) => K
): Record<K, T[]> {
  return data.reduce((acc, curr) => {
    const grouped = groupByFn(curr);
    if (acc[grouped]) {
      acc[grouped] = [...acc[grouped], curr];
    } else {
      acc[grouped] = [curr];
    }
    return acc;
  }, {} as Record<K, T[]>);
}

/**
 * SELECT FNS
 */
export const selectQuestions = (state: AppState) => state.questions;

export const selectQuestionsAnswered: MemoizedSelector<
  AppState,
  UserQuestions,
  DefaultProjectorFn<UserQuestions>
> = createSelector(
  selectActiveUserId,
  selectQuestions,
  (activeUserId: string | null, questions: Record<string, Question>) => {
    return groupBy(getQuestionsArr(questions), groupByAnswered(activeUserId));
  }
);
