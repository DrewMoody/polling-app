import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'leaderboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./views/leaderboard/leaderboard.module').then(
        (m) => m.LeaderboardModule
      ),
  },
  {
    path: 'add',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./views/add-question/add-question.module').then(
        (m) => m.AddQuestionModule
      ),
  },
  {
    path: 'questions',
    canActivate: [AuthGuard],
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
