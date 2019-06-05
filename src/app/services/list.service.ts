import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private http: HttpClient) { }
  getList(id: string) {
    return this.http.get(`http://localhost:4000/api/lists/${id}`);
  }
}
