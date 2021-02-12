import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'leaderboard',
    loadChildren: () =>
      import('./views/leaderboard/leaderboard.module').then(
        (m) => m.LeaderboardModule
      ),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./views/add-question/add-question.module').then(
        (m) => m.AddQuestionModule
      ),
  },
  {
    path: 'questions',
    loadChildren: () =>
      import('./views/questions/questions.module').then(
        (m) => m.QuestionsModule
      ),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
