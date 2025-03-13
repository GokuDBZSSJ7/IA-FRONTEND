import { NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { TurmaService } from '../../../services/turma/turma.service';
import { AuthService } from '../../../services/auth/auth.service';
import { EstudanteService } from '../../../services/estudante/estudante.service';

@Component({
  selector: 'app-estudante',
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
  templateUrl: './estudante.component.html',
  styleUrl: './estudante.component.scss'
})
export class EstudanteComponent {
  showFilters = false;
    displayedColumns: string[] = ['nome', 'turma', 'renda_familiar', 'bolsa', 'distancia', 'menu'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    user: any;
  
    constructor(
      private estudanteService: EstudanteService,
      private authService: AuthService,
      private router: Router,
    ) {
      this.user = this.authService.getUser();
    }
  
    ngOnInit(): void {
      this.listEstudantes();
    }
  
    listEstudantes() {
      this.estudanteService.getEstudantesDoUsuario(this.user.id).subscribe({
        next: res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
        }
      })
    }
  
    delete(id: number) {
      Swal.fire({
        title: "Você quer mesmo deletar a Turma?",
        showDenyButton: true,
        confirmButtonText: "Sim!",
        denyButtonText: `Não!`
      }).then((result) => {
        if (result.isConfirmed) {
          this.estudanteService.delete(id).subscribe({
            next: res => {
              Swal.fire({
                title: "Estudante Deletado com Sucesso!",
                icon: "success",
              });
              this.listEstudantes();
            }, error: err => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo deu errado!",
              });
            }
          })
        } else if (result.isDenied) {
          Swal.fire("O Estudante não foi deletado!", "", "info");
        }
      });
  
    }
  
    edit(id: number) {
      this.router.navigate([`/estudante/criar-estudante/${id}`]);
    }
}
