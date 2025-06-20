import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SettingsComponent } from './settings/settings.component';
import { authGuard } from './guards/auth.guard';  // invece di AuthGuard


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'welcome', loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent) },
  { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
  { 
    path: 'student-dashboard', 
    loadComponent: () => import('./student-dashboard/student-dashboard.component')
      .then(m => m.StudentDashboardComponent)
  },
  {
    path: 'available-courses',
    loadComponent: () =>
      import('./available-courses/available-courses.component')
        .then(m => m.AvailableCoursesComponent),
    canActivate: [AuthGuard]
  }

];