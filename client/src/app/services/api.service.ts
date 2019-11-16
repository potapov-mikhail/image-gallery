import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse } from '../app.interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = `${environment.apiUrl}/images`;

  constructor(private http: HttpClient) {}

  search(search: string, page: number) {
    return this.http.get<ApiResponse>(`${this.url}?search=${search}&page=${page}`);
  }

  fetchByPage(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.url}?page=${page}`);
  }
}
