import { Response } from '@angular/http';
import { Observable } from 'rxjs';


export interface BaseOperations<T> {
  create(t: T): Observable<T>;
  createByParentId(id: string, parent: string, t: T): Observable<T>;
  read(id: string): Observable<T>;
  update(id: string, t: T): Observable<T>;
  delete(id: string): Observable<any>;
  findAll(): Observable<T[]>;
}