import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { tap } from 'rxjs';
import { QuizService } from './common/services/quiz.service';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/quiz-builder/quiz-builder.component').then(c => c.QuizBuilderComponent)
  },{
    path: 'review',
    canActivate: [
      () =>  {
        const quizService = inject(QuizService);
        const router = inject(Router);

        return quizService.quizSize$.pipe(
          tap(size => {
            if (size === 0) {
              router.navigate(['/']);
              return false;
            }

            return true;
          }));
      }
    ],
    loadComponent: () => import('./features/answers/answers.component').then(c => c.AnswersComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
