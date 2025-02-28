import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  url: string = 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<any> {
    return this.http.get(`${this.url}getTurmaByCursoId/${id}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.url}turmas/${id}`);
  }

  update(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}turmas/${id}`, data);
  }

  all(): Observable<any> {
    return this.http.get(`${this.url}turmas`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}turmas`, data);
  }

  getTurmasDoAdmin(id: number): Observable<any> {
    return this.http.get(`${this.url}getTurmasDoAdmin/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}turmas/${id}`);
  }
}
