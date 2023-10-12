import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { IPopupButton } from './interfaces/popup-button.interface';
import { TBasePopupEvent } from './types/popup-event-value.type';

@Component({
  selector: 'app-base-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './base-popup.component.html',
  styleUrls: ['./base-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePopupComponent {
  @Input() title!: string;
  @Input() hasClose = true;

  @Input() submitButton?: IPopupButton;
  @Input() cancelButton?: IPopupButton;

  @Output() fireEv: EventEmitter<TBasePopupEvent> =
    new EventEmitter<TBasePopupEvent>();
}
