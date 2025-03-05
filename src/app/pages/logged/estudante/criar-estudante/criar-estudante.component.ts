import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TurmaService } from '../../../../services/turma/turma.service';
import { CursoService } from '../../../../services/curso/curso.service';
import { AuthService } from '../../../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-estudante',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './criar-estudante.component.html',
  styleUrl: './criar-estudante.component.scss'
})
export class CriarEstudanteComponent {
  form!: FormGroup;
  cursos: any[] = [];
  turmas: any[] = [];
  user: any;
  searchTerm = '';
  selectedCurso: number | null = null;
  filteredCursos = [...this.cursos];
  isEditing: boolean = false;

  constructor(
    private turmaService: TurmaService,
    private fb: FormBuilder,
    private cursoService: CursoService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute  // Importando ActivatedRoute para pegar parâmetros da URL
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.user = this.authService.getUser();
    this.getCurso();
    this.checkForEdit();  // Verifica se há um ID na URL para editar
  }

  createForm() {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      ano: ['', Validators.required],
      curso_id: [null, Validators.required]
    });
  }

  getCurso() {
    this.cursoService.getCursoAdmin(this.user.id).subscribe({
      next: res => {
        this.cursos = res;
      }
    });
  }

  getTurma() {
    const id = this.form.controls['curso_id'].value;
    this.turmaService.getTurmaByCursoId(id).subscribe({
      next: res => {
        this.turmas = res;
      }
    })

  }

  checkForEdit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditing = true;
        this.loadTurmaData(id);
      }
    });
  }

  loadTurmaData(id: number) {
    this.turmaService.getById(id).subscribe({
      next: res => {
        this.form.patchValue({
          id: res.id,
          nome: res.nome,
          ano: res.ano,
          curso_id: res.curso_id  // Aqui, preenche o formulário com os dados da turma
        });
      },
      error: err => {
        Swal.fire('Erro ao carregar dados da turma', '', 'error');
      }
    });
  }

  add() {
    if (this.isEditing) {
      this.updateTurma();  // Se for edição, chama a função de atualizar
    } else {
      this.createTurma();  // Se for criação, chama a função de criar
    }
  }

  createTurma() {
    this.turmaService.create(this.form.value).subscribe({
      next: res => {
        Swal.fire('A Turma foi criada com sucesso!', '', 'success');
        this.router.navigate(['/turma']);
      },
      error: err => {
        Swal.fire('Houve um problema no processo!', '', 'error');
      }
    });
  }

  updateTurma() {
    this.turmaService.update(this.form.value, this.form.controls['id'].value).subscribe({
      next: res => {
        Swal.fire('A Turma foi atualizada com sucesso!', '', 'success');
        this.router.navigate(['/turma']);
      },
      error: err => {
        Swal.fire('Houve um problema ao atualizar a turma!', '', 'error');
      }
    });
  }

  filterCursos() {
    this.filteredCursos = this.cursos.filter(curso =>
      curso.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
