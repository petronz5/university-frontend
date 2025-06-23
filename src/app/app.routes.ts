// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '',         loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },

  {
    path: 'student-dashboard',
    loadComponent: () => import('./student-dashboard/student-dashboard.component')
                          .then(m => m.StudentDashboardComponent),
    canActivate: [ roleGuard ],
    data: { roles: ['Studente'] }
  },
  {
    path: 'professor-dashboard',
    loadComponent: () => import('./professor-dashboard/professor-dashboard.component')
                          .then(m => m.ProfessorDashboardComponent),
    canActivate: [ roleGuard ],
    data: { roles: ['Professore','Rettore'] }
  },
  {
  path: 'degree-subjects',
    loadComponent: () => import('./degree-subjects/degree-subjects.component')
                          .then(m => m.DegreeSubjectsComponent),
    canActivate: [ roleGuard ],
    data: { roles: ['Studente', 'Professore' , 'Rettore'] }
  },
  {
  path: 'exam-booking',
    loadComponent: () => import('./exam-booking/exam-booking.component')
                          .then(m => m.ExamBookingComponent),
    canActivate: [roleGuard],
    data: { roles: ['Studente'] }
  },
  {
    path: 'gradebook',
    loadComponent: () => import('./gradebook/gradebook.component')
                          .then(m => m.GradebookComponent),
    canActivate: [roleGuard],
    data: { roles: ['Studente'] }
  },
  {
    path: 'prof-register',
    loadComponent: () => import('./prof-register/prof-register.component')
                        .then(m => m.ProfRegisterComponent),
    canActivate: [roleGuard],
    data: { roles: ['Professore','Rettore'] }
  },
  {
    path:'exam-calendar',
    loadComponent:() => import('./exam-calendar/exam-calendar.component')
                        .then(m=>m.ExamCalendarComponent),
    canActivate:[roleGuard],
    data:{ roles:['Studente'] }
  },

  { path: '**', redirectTo: '' }
];
