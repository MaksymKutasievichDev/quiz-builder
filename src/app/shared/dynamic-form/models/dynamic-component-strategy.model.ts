import { TAnswerCheckbox } from '../../../common/types/quiz-answer-view.type';
import { TQuizItem } from '../../../common/types/quiz-item.type';
import { DynamicFormConfig } from './dynamic-forms.model';

export abstract class DynamicComponentStrategy<T> {
  abstract generate(): DynamicFormConfig<T>['controls'];
  protected abstract options: TQuizItem['options'];
}

export class DynamicCheckbox extends DynamicComponentStrategy<TAnswerCheckbox> {
  constructor(
    protected answers: TQuizItem['checkList'],
    protected options: TQuizItem['options']
  ) {
    super();
  }

  public generate(): DynamicFormConfig<TAnswerCheckbox>["controls"] {
    return this.answers.reduce((acc, el, i) => {
      return {
        ...acc,
        [i] : {
          controlType: 'checkbox',
          type: 'text',
          label: el,
          value: {
            label: el,
            checked: false
          },
          order: i,
          validators: {
            required: this.options.isRequiredField
          }
        }
      }
    }, {})
  }
}

export class DynamicInput extends DynamicComponentStrategy<string>{
  constructor(
    protected options: TQuizItem['options'],
    private order = 0,
    private label = 'Your answer here'
  ) {
    super();
  }

  public generate(): DynamicFormConfig["controls"] {
    return {
      [0]: {
        controlType: 'input',
        type: 'text',
        label: this.label,
        value: '',
        order: this.order,
        validators: {
          required: this.options.isRequiredField
        }
      }
    };
  }

}
