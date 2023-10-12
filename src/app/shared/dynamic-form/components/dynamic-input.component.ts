import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidatorMessageContainer } from '../../input-error/validator-message-container.directive';

import { BaseDynamicControl, dynamicControlProvider, sharedDynamicControlDeps } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [...sharedDynamicControlDeps, MatFormFieldModule, MatInputModule, ValidatorMessageContainer],
  viewProviders: [dynamicControlProvider],
  template: `
    <mat-form-field color="accent" appearance="outline" floatLabel="always" >
      <mat-label>{{ control.config.label }}</mat-label>
      <input
        [container]="containerDir.container"
        [formControlName]="control.controlKey" [value]="control.config.value" matInput placeholder="How you can describe...">
    </mat-form-field>

    <ng-container validatorMessageContainer #containerDir="validatorMessageContainer"></ng-container>
  `
})
export class DynamicInputComponent extends BaseDynamicControl {

}
