import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ControlContainer, FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { dynamicControlProvider } from '../../../../shared/dynamic-form/components/base-dynamic-control';

@Component({
  selector: 'app-dynamic-checklist',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './dynamic-checklist.component.html',
  viewProviders: [dynamicControlProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicChecklistComponent {
  @Input() controlName: string = 'checkList';
  @Input() title: string = 'Answer options';
  @Input() answerLabel: string = 'Add answer option';
  @Input() answerPlaceholder: string = 'Your answer here...';
  @Input() addAnswerText: string = '➕ Add another answer';
  @Input() maxOptions = 10;

  private _parentGroupDir = inject(ControlContainer);

  protected get listArray(): FormArray{
    return this._parentGroupDir.control?.get(this.controlName) as FormArray;
  }

  public addOption(): void{
    if (this.listArray.length >= this.maxOptions) return;

    this.listArray.push(new FormControl('', [Validators.required]));
 }
}
