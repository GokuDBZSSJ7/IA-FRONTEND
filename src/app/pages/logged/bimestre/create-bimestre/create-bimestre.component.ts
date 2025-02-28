import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoService } from '../../../../services/curso/curso.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BimestreService } from '../../../../services/bimestre/bimestre.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-bimestre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './create-bimestre.component.html',
  styleUrl: './create-bimestre.component.scss'
})
export class CreateBimestreComponent implements OnInit {
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
    private bimestreService: BimestreService
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
      ano: ['', Validators.required],
      curso_id: [null, Validators.required],
      inicio: [null, Validators.required],
      fim: [null, Validators.required]
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
    this.bimestreService.getById(id).subscribe({
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
        Swal.fire('Erro ao carregar dados da Bimestre', '', 'error');
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
    this.bimestreService.create(this.form.value).subscribe({
      next: res => {
        Swal.fire('A Bimestre foi criada com sucesso!', '', 'success');
        this.router.navigate(['/bimestre']);
      },
      error: err => {
        Swal.fire('Houve um problema no processo!', '', 'error');
      }
    });
  }

  updateBimestre() {
    this.bimestreService.update(this.form.value, this.form.controls['id'].value).subscribe({
      next: res => {
        Swal.fire('A Bimestre foi atualizada com sucesso!', '', 'success');
        this.router.navigate(['/bimestre']);
      },
      error: err => {
        Swal.fire('Houve um problema ao atualizar a Bimestre!', '', 'error');
      }
    });
  }
}
