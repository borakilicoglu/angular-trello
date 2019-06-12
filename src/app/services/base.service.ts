import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseOperations } from './base-operations.interface';

export abstract class BaseService<T, ID> implements BaseOperations<T, ID, String> {

  constructor(protected _http: HttpClient, protected _base: string) { }

  create(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  createById(id: ID, string: String, t: T): Observable<T> {
    return this._http.post<T>(this._base + "/" + string + "/" + id, t);
  }

  read(id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + id);
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + id, t, {});
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id);
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base);
  }

  findAllById(id: ID): Observable<T[]> {
    return this._http.get<T[]>(this._base + '/' + id);
  }

}