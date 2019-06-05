import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  constructor(private http: HttpClient) { }
  getIdeas() {
    return this.http.get('http://localhost:4000/api/ideas');
  }
}
