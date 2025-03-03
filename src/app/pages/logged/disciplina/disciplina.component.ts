import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DisciplinaService } from '../../../services/disciplina/disciplina.service';

@Component({
  selector: 'app-disciplina',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    MatTableModule,
    MatPaginator,
    MatButtonModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './disciplina.component.html',
  styleUrl: './disciplina.component.scss'
})
export class DisciplinaComponent {
  showFilters = false;
    displayedColumns: string[] = ['nome', 'professor', 'carga_horaria', 'turma', 'menu'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    user: any;
  
    constructor(
      private disciplinaService: DisciplinaService,
      private authService: AuthService,
      private router: Router
    ) {
      this.user = this.authService.getUser();
    }
  
    ngOnInit(): void {
      this.listBimestres();
    }
  
    listBimestres() {
      this.disciplinaService.get(this.user.id).subscribe({
        next: res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
        }
      })
    }
  
    delete(id: number) {
      Swal.fire({
        title: "Você quer mesmo deletar o Bimestre?",
        showDenyButton: true,
        confirmButtonText: "Sim!",
        denyButtonText: `Não!`
      }).then((result) => {
        if (result.isConfirmed) {
          this.disciplinaService.delete(id).subscribe({
            next: res => {
              Swal.fire({
                title: "Bimestre Deletado com Sucesso!",
                icon: "success",
              });
              this.listBimestres();
            }, error: err => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo deu errado!",
              });
            }
          })
        } else if (result.isDenied) {
          Swal.fire("O Bimestre não foi deletada!", "", "info");
        }
      });
  
    }
  
    edit(id: number) {
      this.router.navigate([`/disciplina/criar-disciplina/${id}`]);
    }
}
