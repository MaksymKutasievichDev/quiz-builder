import { TQuizAnswerType } from './quiz-answer-type.type';

export type TQuizItem = {
  question: string;
  answerType: TQuizAnswerType;
  checkList: string[];
  options: {
    isOwnAnswersAvailable: boolean;
    isRequiredField: boolean;
  }
}
