import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '@app/list/list.interface';
import { BaseService } from './base.service';

@Injectable()
export class ListService extends BaseService<List, string> {
  constructor(protected _http: HttpClient) {
    super(_http, "lists");
  }
}
