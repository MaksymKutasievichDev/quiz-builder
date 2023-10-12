import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { map, Observable, tap, throwError } from 'rxjs';

import { BasePopupEventHandler } from 'src/app/shared/base-popup/base-popup-event-handler.directive';
import { TAnswerCheckbox } from '../../../../common/types/quiz-answer-view.type';
import { TQuizItem } from '../../../../common/types/quiz-item.type';
import { BasePopupComponent } from '../../../../shared/base-popup/base-popup.component';
import { DynamicCheckbox, DynamicInput } from '../../../../shared/dynamic-form/models/dynamic-component-strategy.model';
import { DynamicFormConfig } from '../../../../shared/dynamic-form/models/dynamic-forms.model';
import { DynamicValidatorMessage } from '../../../../shared/input-error/dynamic-message.directive';
import { ValidatorMessageContainer } from '../../../../shared/input-error/validator-message-container.directive';
import { MAX_CHECKBOX_OPTIONS } from '../../constants/max-checkbox-options.constant';
import { DynamicChecklistComponent } from '../dynamic-checklist/dynamic-checklist.component';
import { ANSWER_TYPES, QUESTION_OPTIONS } from './constants/popup-new-questions-config.constant';

@Component({
  selector: 'app-popup-new-question',
  standalone: true,
  imports: [
    CommonModule,
    BasePopupComponent,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    DynamicChecklistComponent,
    DynamicValidatorMessage,
    ValidatorMessageContainer
  ],
  templateUrl: './popup-new-question.component.html',
  styleUrls: ['./popup-new-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupNewQuestionComponent extends BasePopupEventHandler implements OnInit{

  private _fb = inject(NonNullableFormBuilder);
  public readonly maxCheckListLength = inject(MAX_CHECKBOX_OPTIONS);

  public isParagraphType$!: Observable<boolean>;

  public readonly answerTypes = ANSWER_TYPES;
  public readonly questionOptions = QUESTION_OPTIONS;

  public newQuestionForm = this._fb.group({
    answerType: this._fb.control<TQuizItem['answerType']>('checkboxes', [Validators.required]),
    question: this._fb.control<TQuizItem['question']>('', [Validators.required, Validators.minLength(3)]),
    checkList: this._fb.array<string[]>([], [Validators.required]),
    options: this._generateQuestionOptions()
  });

  public ngOnInit(): void {
    this._handleChangeAnswerType();
  }

  public get optionsGroup(): FormGroup{
    return this.newQuestionForm.controls['options'] as FormGroup;
  }

  public onCancel(): void {
    throw new Error('Method not implemented.');
  }

  public onConfirm(): void {
    if (this.newQuestionForm.invalid) return;

    this.dialogRef.close(this._prepareQuestion());
  }

  private _prepareQuestion(): Omit<DynamicFormConfig<TAnswerCheckbox | string>, 'id'> {
    const { checkList, question, options: valueOptions } = this.newQuestionForm.value;

    const options: TQuizItem['options'] = {
      isOwnAnswersAvailable: valueOptions ? !!(valueOptions['isOwnAnswersAvailable']) : false,
      isRequiredField: valueOptions ? !!(valueOptions['isRequiredField']) : false
    }

    const questionConfig =  {
      question: question!,
      options,
      controls: (checkList?.length ? new DynamicCheckbox(checkList, options) : new DynamicInput(options)).generate()
    }

    if (options.isOwnAnswersAvailable && checkList?.length) {
      questionConfig.controls[checkList.length + 1] = new DynamicInput(options, checkList.length - 1, 'Other').generate()[0];
    }

    return questionConfig;
  }

  private _handleChangeAnswerType(): void {
    this.isParagraphType$ = this.newQuestionForm.controls.answerType.valueChanges
      .pipe(
        tap(value => this._updateQuestionTypeValidators(value)),
        map(value => value === 'paragraph')
      )
  }

  private _updateQuestionTypeValidators(value: TQuizItem['answerType']): void{
    const isParagraph = value === 'paragraph';
    const checkListControl = this.newQuestionForm.controls.checkList;

    checkListControl.controls.forEach(ctrl => {
      if (isParagraph){
        ctrl.removeValidators([Validators.required])
      } else ctrl.addValidators([Validators.required]);
      ctrl.updateValueAndValidity();
    });

    if(isParagraph) checkListControl.removeValidators([Validators.required]);
    else checkListControl.addValidators([Validators.required]);
    checkListControl.updateValueAndValidity();
  }

  private _generateQuestionOptions(): FormGroup {
    return this.questionOptions.reduce((formGroup, controlOptions) => {
      formGroup.addControl(controlOptions.controlName, this._fb.control(controlOptions.value));
      return formGroup;
    }, new FormGroup({}));
  }

}
