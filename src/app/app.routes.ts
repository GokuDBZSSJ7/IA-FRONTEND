import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoggedComponent } from './pages/logged/logged.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LoggedComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/logged/dashboard/dashboard.component').then((c) => c.DashboardComponent),
            },
            {
                path: 'turma',
                loadComponent: () => import('./pages/logged/turma/turma.component').then((c) => c.TurmaComponent)
            },
            {
                path: 'turma/criar-turma',
                loadComponent: () => import('./pages/logged/turma/create-turma/create-turma.component').then((c) => c.CreateTurmaComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)
    }
];
