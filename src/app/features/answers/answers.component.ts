import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../common/services/quiz.service';
import { AnswerCardComponent } from './components/answer-card.component';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [CommonModule, AnswerCardComponent, RouterLink],
  templateUrl: './answers.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswersComponent {
  private readonly _quizService = inject(QuizService);

  protected readonly review$ = this._quizService.reviewData$
}
