import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoService } from '../../../../services/curso/curso.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BimestreService } from '../../../../services/bimestre/bimestre.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TurmaService } from '../../../../services/turma/turma.service';
import { DisciplinaService } from '../../../../services/disciplina/disciplina.service';

@Component({
  selector: 'app-criar-disciplina',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './criar-disciplina.component.html',
  styleUrl: './criar-disciplina.component.scss'
})
export class CriarDisciplinaComponent {
  form!: FormGroup;
    turmas: any[] = [];
    user: any;
    searchTerm = '';
    isEditing: boolean = false;
  
    constructor(
      private fb: FormBuilder,
      private turmaService: TurmaService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private disciplinaService: DisciplinaService
    ) { }
  
    ngOnInit(): void {
      this.createForm();
      this.user = this.authService.getUser();
      this.getCurso();
      this.checkForEdit();  
    }
  
    createForm() {
      this.form = this.fb.group({
        id: [null],
        nome: ['', Validators.required],
        turma_id: ['', Validators.required],
        professor: [null, Validators.required],
        carga_horaria: [null, Validators.required],
      });
    }
  
    getCurso() {
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
          this.loadDisciplinaData(id);
        }
      });
    }
  
    loadDisciplinaData(id: number) {
      this.disciplinaService.getById(id).subscribe({
        next: res => {
          this.form.patchValue({
            id: res.id,
            nome: res.nome,
            turma_id: res.turma_id,
            professor: res.professor,
            carga_horaria: res.carga_horaria
          });
        },
        error: err => {
          Swal.fire('Erro ao carregar dados da Disciplina', '', 'error');
        }
      });
    }
  
    add() {
      if (this.isEditing) {
        this.updateDisciplima();  // Se for edição, chama a função de atualizar
      } else {
        this.createDisciplina();  // Se for criação, chama a função de criar
      }
    }
  
    createDisciplina() {
      this.disciplinaService.add(this.form.value).subscribe({
        next: res => {
          Swal.fire('A Disciplina foi criada com sucesso!', '', 'success');
          this.router.navigate(['/disciplina']);
        },
        error: err => {
          Swal.fire('Houve um problema no processo!', '', 'error');
        }
      });
    }
  
    updateDisciplima() {
      this.disciplinaService.update(this.form.value, this.form.controls['id'].value).subscribe({
        next: res => {
          Swal.fire('A Disciplina foi atualizada com sucesso!', '', 'success');
          this.router.navigate(['/disciplina']);
        },
        error: err => {
          Swal.fire('Houve um problema ao atualizar a Disciplina!', '', 'error');
        }
      });
    }
}
