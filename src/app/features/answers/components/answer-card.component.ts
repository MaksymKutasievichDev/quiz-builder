import { KeyValuePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TQuizReviewAnswer } from '../../../common/types/quiz-review-answer.type';
import { QUESTION_OPTIONS, QUESTION_OPTIONS_MAP } from '../../quiz-builder/components/popup-new-question/constants/popup-new-questions-config.constant';
import { TQuestionOption } from '../../quiz-builder/components/popup-new-question/types/question-option.type';

@Component({
  selector: 'app-answer-card',
  standalone: true,
  templateUrl: './answer-card.component.html',
  imports: [
    NgForOf,
    KeyValuePipe,
    NgIf,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerCardComponent {
  private _answer!: Omit<TQuizReviewAnswer, 'answer'> & {
    answer: string[]
  };
  @Input()
  get answer (): typeof this._answer {
    return this._answer;
  }
  set answer (value: TQuizReviewAnswer) {
    if (Array.isArray(value.answer)) {
      this._answer = value as typeof this._answer;
      return;
    }

    this._answer = {
      ...value,
      answer: [value.answer]
    };
  }

  @Input() questionOptions: Record<TQuestionOption['controlName'], TQuestionOption['value']> = QUESTION_OPTIONS_MAP;
}
