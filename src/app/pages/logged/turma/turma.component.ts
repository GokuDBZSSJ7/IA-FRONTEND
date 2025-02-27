import { NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TurmaService } from '../../../services/turma/turma.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-turma',
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
  templateUrl: './turma.component.html',
  styleUrl: './turma.component.scss'
})
export class TurmaComponent implements OnInit {

  showFilters = false;
  displayedColumns: string[] = ['nome', 'ano', 'curso', 'menu'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  user: any;

  constructor(
    private turmaService: TurmaService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.listTurmas();
  }

  listTurmas() {
    this.turmaService.getTurmasDoAdmin(this.user.id).subscribe({
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
      // showCancelButton: true,
      confirmButtonText: "Sim!",
      denyButtonText: `Não!`
    }).then((result) => {
      if (result.isConfirmed) {
        this.turmaService.delete(id).subscribe({
          next: res => {
            Swal.fire({
              title: "Turma Deletada com Sucesso!",
              icon: "success",
            });
            this.listTurmas();
          }, error: err => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo deu errado!",
              // footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire("A Turma não foi deletada!", "", "info");
      }
    });

  }
}
