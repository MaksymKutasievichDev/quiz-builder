import { CommonModule, KeyValue } from '@angular/common';
import { Directive, HostBinding, inject, OnInit, StaticProvider } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { DynamicValidatorMessage } from '../../input-error/dynamic-message.directive';
import { CONTROL_DATA } from '../control-data.token';
import { DynamicControl } from '../models/dynamic-forms.model';

export const comparatorFn = (
  a: KeyValue<string, DynamicControl>,
  b: KeyValue<string, DynamicControl>
): number => a.value.order - b.value.order;

export const sharedDynamicControlDeps = [CommonModule, ReactiveFormsModule, DynamicValidatorMessage];

export const dynamicControlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true })
}

@Directive()
export class BaseDynamicControl implements OnInit {
  @HostBinding('class') hostClass = 'form-field';

  public control = inject(CONTROL_DATA);

  public formControl: AbstractControl = new FormControl(
    this.control.config.value,
    this._resolveValidators(this.control.config)
  );

  private _parentGroupDir = inject(ControlContainer);

  public ngOnInit() {
    (this._parentGroupDir.control as FormGroup).addControl(
      this.control.controlKey,
      this.formControl
    );
  }

  private _resolveValidators({ validators = {} }: DynamicControl) {
    return ((Object.keys(validators) as Array<keyof typeof validators>).map((valKey) => validators[valKey] ? this._getValidatorByKey(valKey, validators[valKey]) : Validators.nullValidator));
  }

  private _getValidatorByKey(validator: string, validatorValue?: unknown): ValidatorFn {
    return {
      'required': Validators.required,
      'email': Validators.email,
      'requiredTrue': Validators.requiredTrue,
      'minLength': Validators.minLength(validatorValue as number)
    }[validator] || Validators.nullValidator;
  }
}
