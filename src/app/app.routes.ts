import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/no-auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    canActivate: [noAuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
    canActivate: [noAuthGuard],
  },
  {
    path: 'record',
    loadComponent: () =>
      import('./record/record.page').then((m) => m.RecordPage),
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.page').then(
        (m) => m.ForgotPasswordPage
      ),
    canActivate: [noAuthGuard],
  },
];
