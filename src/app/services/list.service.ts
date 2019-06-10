import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private http: HttpClient) { }

  private _authHeader(): Object {
    return {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('credentials')).token}` })
    };
  }

  getList(id: string): Observable<any> {
    return this.http.get(`http://localhost:4000/api/lists/${id}`);
  }

  addList(boardId: string, name: string): Observable<any> {
    return this.http.post(`http://localhost:4000/api/lists/board/${boardId}`, { name }, this._authHeader());
  }
}
