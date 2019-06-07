import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient) { }

  private _authHeader(): Object {
    return {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('credentials')).token}` })
    };
  }

  createCard(name: string, description: string, list: string) {
    return this.http.post<any>(`http://localhost:4000/api/cards/list/${list}`, { name, description }, this._authHeader())
      .pipe(map(card => {
        return card;
      }));
  }

  updateCard(id: string, name: string) {
    return this.http.put<any>(`http://localhost:4000/api/cards/${id}`, { name }, this._authHeader())
      .pipe(map(card => {
        return card;
      }));
  }

  deleteCard(list: string) {
    return this.http.delete<any>(`http://localhost:4000/api/cards/${list}`, this._authHeader())
      .pipe(map(card => {
        return card;
      }));
  }
}
