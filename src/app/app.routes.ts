import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/logged/home/home.component').then((c) => c.HomeComponent),
        canActivate: [authGuard]
    }
];
