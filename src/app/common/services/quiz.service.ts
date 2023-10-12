import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, share } from 'rxjs';

import { DynamicFormConfig } from '../../shared/dynamic-form/models/dynamic-forms.model';
import { Answer, CheckboxAnswer, CheckboxCombinedAnswer, TextAnswer } from '../models/answer.model';
import { TQuizReviewAnswer, TQuizReviewFormValue } from '../types/quiz-review-answer.type';

@Injectable({
  providedIn: 'root'
})
export class QuizService<T> {

  private readonly _quizSet: BehaviorSubject<DynamicFormConfig<T>[]> = new BehaviorSubject<DynamicFormConfig<T>[]>([]);
  private readonly _reviewData: BehaviorSubject<Map<string, Partial<TQuizReviewAnswer>>> = new BehaviorSubject<Map<string ,Partial<TQuizReviewAnswer>>>(new Map());

  public get quizItems$(): Observable<DynamicFormConfig<T>[]>{
    return this._quizSet.asObservable();
  }

  public reviewData$: Observable<Map<string, Partial<TQuizReviewAnswer>>> = this._reviewData.asObservable();

  public quizSize$: Observable<number> = this._quizSet.asObservable().pipe(
    map(quizSet => quizSet.reduce((acc, q) => acc + Object.keys(q.controls).length, 0))
  );

  public addQuestion(formConfig: Omit<DynamicFormConfig<T>, 'id'> ): void{
    const currentValue = this._quizSet.getValue();

    this._quizSet.next([...currentValue, { ...formConfig, id: currentValue.length + 1 }]);
  }

  public reviewAnswers(answersValue: TQuizReviewFormValue ): void {
    (Object.entries(answersValue).forEach(([key, val]) => {
      const provider = typeof val[0] === 'string' ? TextAnswer : Object.values(val).some((v) => typeof v === 'string') ? CheckboxCombinedAnswer : CheckboxAnswer;

      this.addReviewControlPartialData(key, new Answer(new provider(val)).getAnswer());
    }));
  }

  public addReviewControlPartialData(id: string, partialData: Partial<TQuizReviewAnswer>): void {
    const reviewSet = this._reviewData.getValue();
    reviewSet.set(id, {
      ...reviewSet.get(id),
      ...partialData
    });

    this._reviewData.next(reviewSet);
  }
}
