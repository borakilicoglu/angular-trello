import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient) { }
  getBoards() {
    return this.http.get('http://localhost:4000/api/boards');
  }
  getBoard(id: string) {
    return this.http.get(`http://localhost:4000/api/boards?id=${id}`);
  }
}
