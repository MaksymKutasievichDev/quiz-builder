import { Directive, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { TBaseEventHandler, TBasePopupEvent, } from './types/popup-event-value.type';

@Directive()
export abstract class BasePopupEventHandler
  implements TBaseEventHandler<TBasePopupEvent>
{
  protected dialogRef: MatDialogRef<any> = inject(MatDialogRef);

  abstract onCancel(): void;

  public onClose(): void {
    this.dialogRef.close();
  }

  abstract onConfirm(): void;

  public defineBasePopupEvent = (event: TBasePopupEvent) => {
    return {
      confirm: this.onConfirm,
      cancel: this.onCancel,
      close: this.onClose,
    }[event].call(this);
  };
}
