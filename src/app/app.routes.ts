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
            },
            {
                path: 'turma/criar-turma/:id',
                loadComponent: () => import('./pages/logged/turma/create-turma/create-turma.component').then((c) => c.CreateTurmaComponent)
            },
            {
                path: 'bimestre',
                loadComponent: () => import('./pages/logged/bimestre/bimestre.component').then((c) => c.BimestreComponent)
            },
            {
                path: 'bimestre/criar-bimestre',
                loadComponent: () => import('./pages/logged/bimestre/create-bimestre/create-bimestre.component').then((c) => c.CreateBimestreComponent)
            },
            {
                path: 'bimestre/criar-bimestre/:id',
                loadComponent: () => import('./pages/logged/bimestre/create-bimestre/create-bimestre.component').then((c) => c.CreateBimestreComponent)
            },
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)
    }
];
