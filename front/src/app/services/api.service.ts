import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(module: string) {
    return this.http.get<any>(`${environment.urlApi}/${module}/get`)
  }

  getAll(module: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlApi}/${module}/getAll`)
  }

  create(module: string, params: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/${module}/create`, params)
  }
}
