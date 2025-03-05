import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {

  url: string = 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient
  ) { }

  all(): Observable<any> {
    return this.http.get(`${this.url}estudantes`);
  }

  getEstudantesByAdminId(id: number): Observable<any> {
    return this.http.get(`${this.url}getEstudantesByAdminId/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}estudantes/${id}`);
  }

  update(data: any, id: number): Observable<any> {
    return this.http.put(`${this.url}estudantes/${id}`, data);
  }
}
