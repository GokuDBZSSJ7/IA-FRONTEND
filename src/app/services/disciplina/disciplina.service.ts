import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  url: string = 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<any> {
    return this.http.get(`${this.url}getDisciplinasByAdminId/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}disciplinas/${id}`);
  }
}
