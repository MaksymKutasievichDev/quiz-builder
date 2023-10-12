import { Validators } from "@angular/forms";

import { TQuizItem } from '../../../common/types/quiz-item.type';

type ValidatorKeys = keyof Omit<typeof Validators , 'prototype'  | 'compose' | 'composeAsync'>;

export interface DynamicControl<T = string> {
  controlType: 'input' | 'checkbox' ;
  type?: string;
  label: string;
  value: T | null;
  order: number,
  validators?: {
    [key in ValidatorKeys]?: unknown;
  }
}
export interface DynamicFormConfig<T = string> {
  id: number;
  question: string;
  options: TQuizItem['options'];
  controls: {
    [key: string]: DynamicControl<T>;
  }
}
