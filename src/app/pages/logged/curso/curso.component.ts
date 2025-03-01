import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CursoService } from '../../../services/curso/curso.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-curso',
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
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss'
})
export class CursoComponent {
  showFilters = false;
  displayedColumns: string[] = ['nome', 'escola', 'admin', 'menu'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  user: any;

  constructor(
    private cursoService: CursoService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.listTurmas();
  }

  listTurmas() {
    this.cursoService.getCursoAdmin(this.user.id).subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  delete(id: number) {
    Swal.fire({
      title: "Você quer mesmo deletar o Curso?",
      showDenyButton: true,
      confirmButtonText: "Sim!",
      denyButtonText: `Não!`
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.delete(id).subscribe({
          next: res => {
            Swal.fire({
              title: "Curso Deletado com Sucesso!",
              icon: "success",
            });
            this.listTurmas();
          }, error: err => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo deu errado!",
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire("O Curso não foi deletado!", "", "info");
      }
    });

  }

  edit(id: number) {
    this.router.navigate([`/curso/criar-curso/${id}`]);
  }
}
