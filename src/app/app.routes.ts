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
            {
                path: 'disciplina',
                loadComponent: () => import('./pages/logged/disciplina/disciplina.component').then((c) => c.DisciplinaComponent)
            },
            {
                path: 'disciplina/criar-disciplina',
                loadComponent: () => import('./pages/logged/disciplina/criar-disciplina/criar-disciplina.component').then((c) => c.CriarDisciplinaComponent)
            },
            {
                path: 'disciplina/criar-disciplina/:id',
                loadComponent: () => import('./pages/logged/disciplina/criar-disciplina/criar-disciplina.component').then((c) => c.CriarDisciplinaComponent)
            },
            {
                path: 'curso',
                loadComponent: () => import('./pages/logged/curso/curso.component').then((c) => c.CursoComponent)
            },
            {
                path: 'curso/criar-curso',
                loadComponent: () => import('./pages/logged/curso/criar-curso/criar-curso.component').then((c) => c.CriarCursoComponent)
            },
            {
                path: 'curso/criar-curso/:id',
                loadComponent: () => import('./pages/logged/curso/criar-curso/criar-curso.component').then((c) => c.CriarCursoComponent)
            },
            {
                path: 'estudante',
                loadComponent: () => import('./pages/logged/estudante/estudante.component').then((c) => c.EstudanteComponent)
            },
            {
                path: 'estudante/criar-estudante',
                loadComponent: () => import('./pages/logged/estudante/criar-estudante/criar-estudante.component').then((c) => c.CriarEstudanteComponent)
            },
            {
                path: 'estudante/criar-estudante/:id',
                loadComponent: () => import('./pages/logged/estudante/criar-estudante/criar-estudante.component').then((c) => c.CriarEstudanteComponent)
            },
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)
    }
];
