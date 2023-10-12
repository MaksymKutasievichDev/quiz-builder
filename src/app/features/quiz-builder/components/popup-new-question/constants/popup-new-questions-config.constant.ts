import { TQuizItem } from '../../../../../common/types/quiz-item.type';
import { TQuestionOption } from '../types/question-option.type';

export const ANSWER_TYPES: { label: string, value: TQuizItem['answerType'] }[] = [
  {
    label: 'Paragraph',
    value: 'paragraph'
  },
  {
    label: 'Check list',
    value: 'checkboxes'
  }
];

export const QUESTION_OPTIONS: TQuestionOption[] = [
  {
    controlName: 'isOwnAnswersAvailable',
    label: 'Allow user to specify their own answer',
    value: false
  },
  {
    controlName: 'isRequiredField',
    label: 'This field is required',
    value: false
  }
];

export const QUESTION_OPTIONS_MAP: Record<TQuestionOption['controlName'], TQuestionOption['value']> = QUESTION_OPTIONS.reduce((acc, el) => {
  acc[el.controlName] = el.value;

  return acc;
}, {} as Record<TQuestionOption['controlName'], TQuestionOption['value']>);
