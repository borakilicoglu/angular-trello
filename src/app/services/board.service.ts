import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private http: HttpClient) { }

  private _authHeader(): Object {
    return {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('credentials')).token}` })
    };
  }

  getBoards(): Observable<any> {
    return this.http.get('http://localhost:4000/api/boards');
  }
  getBoard(id: string): Observable<any> {
    return this.http.get(`http://localhost:4000/api/boards/${id}`);
  }
  createBoard(name: string): Observable<any> {
    return this.http.post(`http://localhost:4000/api/boards`, { name }, this._authHeader());
  }
  deleteBoard(id: string) {
    return this.http.delete(`http://localhost:4000/api/boards/${id}`, this._authHeader());
  }
}
