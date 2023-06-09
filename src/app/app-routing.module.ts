import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesListComponent } from './features/vacancies/components/vacancies-list/vacancies-list.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { ApplicantPersonalAccountMainComponent } from './features/applicant-personal-account/components/applicant-personal-account-main/applicant-personal-account-main.component';
import { VacancyCardComponent } from './features/vacancies/components/vacancy-card/vacancy-card.component';
import { AppComponent } from './app.component';
import { VacanciesModule } from './features/vacancies/vacancies.module';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { VacancyApplicationComponent } from './features/vacancies/components/vacancy-application/vacancy-application.component';
import { CandidatesListComponent } from './features/candidates/components/candidates-list/candidates-list.component';
import { VacancyCreationComponent } from './features/vacancies/components/vacancy-creation/vacancy-creation.component';
import { GratitudeComponent } from './core/components/gratitude/gratitude.component';
import { CandidateApplicationsListComponent } from './features/candidates/components/candidate-applications-list/candidate-applications-list.component';
import { CandidateCardComponent } from './features/candidates/components/candidate-card/candidate-card.component';
import { RegistrationComponent } from './core/components/registration/registration.component';
import { LoginComponent } from './core/components/login/login.component';
import { CandidateApplicationCardComponent } from './features/candidates/components/candidate-application-card/candidate-application-card.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Авторизация',
    component: LoginComponent,
  },
  // {
  //   path: 'registration',
  //   title: 'Регистрация',
  //   component: RegistrationComponent,
  // },
  {
    path: 'vacancies',
    title: 'Вакансии',
    component: VacanciesListComponent
  },
  {
    path: 'my-vacancies',
    title: 'Мои вакансии',
    component: VacanciesListComponent
  },
  {
    path: 'vacancy/:id',
    title: 'Карточка вакансии',
    component: VacancyCardComponent
  },
  {
      path: 'vacancy-application/:id',
      title: 'Подача заявки',
      component: VacancyApplicationComponent
  },
  {
    path: 'vacancy-creation',
    title: 'Создание вакансии',
    component: VacancyCreationComponent,
    canActivate: [AuthGuard],
},
  {
    path: 'candidates',
    title: 'Кандидаты',
    component: CandidatesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'candidate/:id',
    title: 'Карточка кандидата',
    component: CandidateCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'applications',
    title: 'Отклики',
    component: CandidateApplicationsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'application/:id',
    title: 'Отклик кандидата',
    component: CandidateApplicationCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'candidate',
    component: ApplicantPersonalAccountMainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gratitude',
    title: 'Спасибо за отклик!',
    component: GratitudeComponent,
  },
  { 
    path: '', 
    redirectTo: '/vacancies',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
