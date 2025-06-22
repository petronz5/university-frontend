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

  { path: '**', redirectTo: '' }
];
