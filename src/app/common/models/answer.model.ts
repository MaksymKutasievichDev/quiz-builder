import { TAnswerCheckbox } from '../types/quiz-answer-view.type';
import { TQuizReviewAnswer, TQuizReviewFormValue } from '../types/quiz-review-answer.type';

export interface AnswerProvider {
  build(): Partial<TQuizReviewAnswer>;
}

export class Answer {
  constructor(protected provider: AnswerProvider) {}

  getAnswer() {
    return this.provider.build();
  }
}

export class CheckboxAnswer implements AnswerProvider {
  constructor(protected config: TQuizReviewFormValue[keyof TQuizReviewFormValue]) {}

  public build(): Partial<TQuizReviewAnswer> {
      return {
        answerType: 'checkboxes',
        answer: this.filterCheckedValues()
      }
  }

  protected filterCheckedValues(): Array<string> {
    return (Object.values(this.config) as Array<TAnswerCheckbox>)
                      .filter((value) => value['checked'])
                      .map((value) => value.label);
  }
}

export class CheckboxCombinedAnswer extends CheckboxAnswer {
  protected override filterCheckedValues(): Array<string> {
    this.config = (Object.entries(this.config))
      .reduce((acc, [key, value]) => {
        acc[key] = typeof value === 'string' ? { label: value, checked: true } : value;

        return acc;
      }, {} as TQuizReviewFormValue[keyof TQuizReviewFormValue]);

    return super.filterCheckedValues();
  }
}

export class TextAnswer implements AnswerProvider {
  constructor(protected config: TQuizReviewFormValue[keyof TQuizReviewFormValue]) {}

  public build(): Partial<TQuizReviewAnswer> {
    return {
      answerType: 'paragraph',
      answer: Object.values(this.config) as Array<string>
    }
  }
}
