import { Response } from '@angular/http';
import { Observable } from 'rxjs';


export interface BaseOperations<T, ID, String> {
  create(t: T): Observable<T>;
  createById(id: ID, url: String, t: T): Observable<T>;
  read(id: ID): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  delete(id: ID): Observable<any>;
  findAll(): Observable<T[]>;
  findAllById(id: ID): Observable<T[]>;
}