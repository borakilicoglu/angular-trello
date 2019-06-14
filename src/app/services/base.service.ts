import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseOperations } from './base-operations.interface';
import { environment } from '@env/environment';

export abstract class BaseService<T> implements BaseOperations<T> {
  private serverUrl: string = environment.serverUrl
  constructor(protected _http: HttpClient, protected _collection: string) { }

  create(t: T): Observable<T> {
    return this._http.post<T>(this.serverUrl + '/' + this._collection, t);
  }

  createByParentId(id: string, parent: string, t: T): Observable<T> {
    return this._http.post<T>(this.serverUrl + '/' + this._collection + "/" + parent + "/" + id, t);
  }

  read(id: string): Observable<T> {
    return this._http.get<T>(this.serverUrl + '/' + this._collection + "/" + id);
  }

  update(id: string, t: T): Observable<T> {
    return this._http.put<T>(this.serverUrl + '/' + this._collection + "/" + id, t, {});
  }

  delete(id: string): Observable<T> {
    return this._http.delete<T>(this.serverUrl + '/' + this._collection + '/' + id);
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this.serverUrl + '/' + this._collection);
  }
}