import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BimestreService {

  url: string = 'http://127.0.0.1:8000/api/';
  
    constructor(
      private http: HttpClient
    ) { }

  delete(id: number) {
    return this.http.delete(`${this.url}bimestres`)
  }

  getBimestresByAdminId(id: number): Observable<any> {
    return this.http.get(`${this.url}getBimestresByAdminId/${id}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.url}bimestres/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}bimestres`, data);
  }

  update(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}bimestres`, data);
  }
}
