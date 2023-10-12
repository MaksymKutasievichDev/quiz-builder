import { TAnswerCheckbox } from './quiz-answer-view.type';
import { TQuizItem } from './quiz-item.type';

export type TQuizReviewAnswer = Omit<TQuizItem, 'checkList'> & {
  answer: string | string[];
};

export type TQuizReviewFormValue = {
  [q_id: string]: {
    [ctrl: string]: string | TAnswerCheckbox,
  },
}
