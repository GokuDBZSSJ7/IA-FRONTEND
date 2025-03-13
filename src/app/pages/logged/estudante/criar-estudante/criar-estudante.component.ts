import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoService } from '../../../../services/curso/curso.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BimestreService } from '../../../../services/bimestre/bimestre.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TurmaService } from '../../../../services/turma/turma.service';
import { EstudanteService } from '../../../../services/estudante/estudante.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-criar-estudante',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './criar-estudante.component.html',
  styleUrl: './criar-estudante.component.scss'
})
export class CriarEstudanteComponent {
  form!: FormGroup;
      turmas: any[] = [];
      user: any;
      searchTerm = '';
      isEditing: boolean = false;
      bimestres: any[] = [];
    
      constructor(
        private fb: FormBuilder,
        private turmaService: TurmaService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private estudanteService: EstudanteService,
        private bimestreService: BimestreService
      ) { }
    
      ngOnInit(): void {
        this.createForm();
        this.user = this.authService.getUser();
        this.getTurma();
        this.getBimestres();
        this.checkForEdit();  
      }

      getBimestres() {
        this.bimestreService.getBimestresByAdminId(this.user.id).subscribe({
          next: res => {
            this.bimestres = res;
          }
        })
      }
    
      createForm() {
        this.form = this.fb.group({
          id: [null],
          nome: ['', Validators.required],
          turma_id: ['', Validators.required],
          curso_id: [null, Validators.required],
          bimestre_id: [null, Validators.required],
          escola_id: [null, Validators.required],
          renda_familiar: [null],
          bolsa: [false],
          distancia: [null]
        });
      }
    
      getTurma() {
        this.turmaService.getTurmasDoAdmin(this.user.id).subscribe({
          next: res => {
            this.turmas = res;
          }
        });
      }
    
      checkForEdit() {
        this.route.params.subscribe(params => {
          const id = params['id'];
          if (id) {
            this.isEditing = true;
            this.loadEstudanteData(id);
          }
        });
      }
    
      loadEstudanteData(id: number) {
        this.estudanteService.getById(id).subscribe({
          next: res => {
            this.form.patchValue({
              id: res.id,
              nome: res.nome,
              turma_id: res.turma_id,
              curso_id: res.curso_id,
              bimestre_id: res.bimestre_id,
              escola_id: res.escola_id,
              renda_familiar: res.renda_familiar,
              bolsa: res.bolsa,
              distancia: res.distancia
            });
          },
          error: err => {
            Swal.fire('Erro ao carregar dados do Estudante', '', 'error');
          }
        });
      }
    
      add() {
        if (this.isEditing) {
          this.updateDisciplima();  
        } else {
          this.createDisciplina(); 
        }
      }
    
      createDisciplina() {
        this.turmaService.getById(this.form.controls['turma_id'].value).pipe(
          tap(res => this.form.patchValue({ curso_id: res.curso.id, escola_id: res.curso.escola_id })),
          switchMap(() => this.estudanteService.add(this.form.value))
        ).subscribe({
          next: () => {
            Swal.fire('O estudante foi criado com sucesso!', '', 'success');
            this.router.navigate(['/estudante']);
          },
          error: () => {
            Swal.fire('Houve um problema no processo!', '', 'error');
          }
        });
      }
      
    
      updateDisciplima() {
        this.estudanteService.update(this.form.value, this.form.controls['id'].value).subscribe({
          next: res => {
            Swal.fire('O Estudante foi atualizada com sucesso!', '', 'success');
            this.router.navigate(['/estudante']);
          },
          error: err => {
            Swal.fire('Houve um problema ao atualizar o Estudante!', '', 'error');
          }
        });
      }
}
