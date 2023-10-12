import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TAnswerCheckbox } from '../../../common/types/quiz-answer-view.type';
import { DynamicControl } from '../models/dynamic-forms.model';
import { BaseDynamicControl, dynamicControlProvider, sharedDynamicControlDeps } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-checkbox',
  standalone: true,
  imports: [...sharedDynamicControlDeps, MatCheckboxModule],
  viewProviders: [dynamicControlProvider],
  template: `
    <div>
      <mat-checkbox 
        [checked]="formControl.value.checked"
        type="checkbox"
        (change)="setValue($event.checked)"
      >{{control.config.label}}</mat-checkbox>
    </div>
  `,
})
export class DynamicCheckboxComponent extends BaseDynamicControl {

  public setValue(value: boolean): void{
    this.formControl.setValue({
      label: (this.control.config as unknown as DynamicControl<TAnswerCheckbox>).value!.label,
      checked: value
    });
  }
}


