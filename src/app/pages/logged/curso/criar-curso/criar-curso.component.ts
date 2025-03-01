import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CursoService } from '../../../../services/curso/curso.service';
import { AuthService } from '../../../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-curso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './criar-curso.component.html',
  styleUrl: './criar-curso.component.scss'
})
export class CriarCursoComponent {
  form!: FormGroup;
    cursos: any[] = [];
    user: any;
    searchTerm = '';
    selectedCurso: number | null = null;
    filteredCursos = [...this.cursos];
    isEditing: boolean = false;
  
    constructor(
      private fb: FormBuilder,
      private cursoService: CursoService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
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
        admin_id: [null, Validators.required],
        escola_id: [null, Validators.required]
      });
    }
  
    getCurso() {
      this.cursoService.getCursoAdmin(this.user.id).subscribe({
        next: res => {
          this.cursos = res;
        }
      });
    }
  
    checkForEdit() {
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.isEditing = true;
          this.loadBimestreData(id);
        }
      });
    }
  
    loadBimestreData(id: number) {
      this.cursoService.getById(id).subscribe({
        next: res => {
          this.form.patchValue({
            id: res.id,
            nome: res.nome,
            ano: res.ano,
            inicio: res.inicio,
            fim: res.fim,
            curso_id: res.curso_id  // Aqui, preenche o formulário com os dados da Bimestre
          });
        },
        error: err => {
          Swal.fire('Erro ao carregar dados do Bimestre', '', 'error');
        }
      });
    }
  
    add() {
      if (this.isEditing) {
        this.updateBimestre();  // Se for edição, chama a função de atualizar
      } else {
        this.createBimestre();  // Se for criação, chama a função de criar
      }
    }
  
    createBimestre() {
      this.form.controls['admin_id'].patchValue(this.user.id);
      this.form.controls['escola_id'].patchValue(this.user.escola_id);
      this.cursoService.create(this.form.value).subscribe({
        next: res => {
          Swal.fire('O Bimestre foi criado com sucesso!', '', 'success');
          this.router.navigate(['/curso']);
        },
        error: err => {
          Swal.fire('Houve um problema no processo!', '', 'error');
        }
      });
    }
  
    updateBimestre() {
      this.form.controls['admin_id'].patchValue(this.user.id);
      this.form.controls['escola_id'].patchValue(this.user.escola_id);
      this.cursoService.update(this.form.value, this.form.controls['id'].value).subscribe({
        next: res => {
          Swal.fire('O Curso foi atualizado com sucesso!', '', 'success');
          this.router.navigate(['/curso']);
        },
        error: err => {
          Swal.fire('Houve um problema ao atualizar a Bimestre!', '', 'error');
        }
      });
    }
}
