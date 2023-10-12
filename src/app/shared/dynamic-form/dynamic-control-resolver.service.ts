import { Injectable, Type } from '@angular/core';
import { from, of, tap } from 'rxjs';

import { DynamicControl } from './models/dynamic-forms.model';

type DynamicControlsMap = {
  [T in DynamicControl['controlType']]: () => Promise<Type<any>>;
};

@Injectable({
  providedIn: 'root'
})
export class DynamicControlResolver {
  private lazyControlComponents: DynamicControlsMap = {
    input: () => import('./components/dynamic-input.component').then(c => c.DynamicInputComponent),
    checkbox: () => import('./components/dynamic-checkbox.component').then(c => c.DynamicCheckboxComponent),
  }
  private loadedControlComponents = new Map<string, Type<any>>();

  resolve(controlType: keyof DynamicControlsMap) {
    const loadedComponent = this.loadedControlComponents.get(controlType);
    if (loadedComponent) {
      return of(loadedComponent);
    }
    return from(this.lazyControlComponents[controlType]()).pipe(
      tap(comp => this.loadedControlComponents.set(controlType, comp))
    );
  }
}
