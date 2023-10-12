import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { filter, map, Observable } from 'rxjs';

import { QuizService } from '../../../common/services/quiz.service';
import { DynamicValidatorMessage } from '../../input-error/dynamic-message.directive';
import { comparatorFn } from '../components/base-dynamic-control';
import { ControlInjectorPipe } from '../control-injector.pipe';
import { DynamicControlResolver } from '../dynamic-control-resolver.service';
import { DynamicFormConfig } from '../models/dynamic-forms.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlInjectorPipe, MatButtonModule, DynamicValidatorMessage],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {

  private _quizService = inject(QuizService);

  public comparatorFn = comparatorFn;
  public controlResolver: DynamicControlResolver = inject(DynamicControlResolver);

  @Input() form!: FormGroup;
  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public formConfig$: Observable<{ forms: FormGroup[], config: DynamicFormConfig[] }> =
    this._quizService.quizItems$
        .pipe(
          filter(items => items.length > 0),
          map(items => {
            items.forEach(el => {
              const { id, question, options } = el;

              this.form.addControl(id.toString(), new FormGroup({}));
              this._quizService.addReviewControlPartialData(id.toString(), { question, options } );
            });

            return {
              config: items,
              forms: this.form.controls as unknown as FormGroup[]
            }
          })
        );
}
