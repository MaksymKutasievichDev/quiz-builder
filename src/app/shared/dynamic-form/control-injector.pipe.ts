import { inject, Injector, Pipe, PipeTransform } from '@angular/core';

import { CONTROL_DATA } from './control-data.token';
import { DynamicControl } from './models/dynamic-forms.model';

@Pipe({
  name: 'controlInjector',
  standalone: true
})
export class ControlInjectorPipe implements PipeTransform {
  private _injector = inject(Injector);

  transform(controlKey: string, config: DynamicControl): Injector {
    return Injector.create({
      parent: this._injector,
      providers: [
        {
          provide: CONTROL_DATA,
          useValue: { controlKey, config }
        }
      ]
    });
  }
}
