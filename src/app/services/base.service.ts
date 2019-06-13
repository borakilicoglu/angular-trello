import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseOperations } from './base-operations.interface';
import { environment } from '@env/environment';

export abstract class BaseService<T, ID> implements BaseOperations<T, ID, String> {

  constructor(protected _http: HttpClient, protected _collection: string, protected serverUrl: string = environment.serverUrl) { }

  create(t: T): Observable<T> {
    return this._http.post<T>(this.serverUrl + '/' + this._collection, t);
  }

  createByParentId(id: ID, parent: String, t: T): Observable<T> {
    return this._http.post<T>(this.serverUrl + '/' + this._collection + "/" + parent + "/" + id, t);
  }

  read(id: ID): Observable<T> {
    return this._http.get<T>(this.serverUrl + '/' + this._collection + "/" + id);
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this.serverUrl + '/' + this._collection + "/" + id, t, {});
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this.serverUrl + '/' + this._collection + '/' + id);
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this.serverUrl + '/' + this._collection);
  }
}