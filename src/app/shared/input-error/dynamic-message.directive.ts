import { ComponentRef, Directive, inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { startWith, takeUntil } from 'rxjs';

import { DestroyDirective } from '../../common/utils/destroy.directive';
import { InputErrorComponent } from './input-error.component';

@Directive({
  selector: `
    [formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
  `,
  standalone: true,
  hostDirectives: [DestroyDirective]
})
export class DynamicValidatorMessage implements OnInit {
  private _destroy$ = inject(DestroyDirective).destroy$;

  public ngControl = inject(NgControl, { self: true });

  @Input()
  public container = inject(ViewContainerRef);

  private componentRef: ComponentRef<InputErrorComponent> | null = null;

  ngOnInit() {
    this.ngControl.control?.statusChanges.pipe(
        startWith(this.ngControl.control?.status),
        takeUntil(this._destroy$),
      ).subscribe(() => {
        const control = this.ngControl.control;

        if (control && control.invalid && control.dirty) {
          if (!this.componentRef) {
            this.componentRef = this.container.createComponent(InputErrorComponent);
            this.componentRef.changeDetectorRef.markForCheck();
          }
          this.componentRef.setInput('errors', this.ngControl.errors);
        } else {
          this.componentRef?.destroy();
          this.componentRef = null;
        }
    })
  }
}
