import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from '@app/board/board.interface';
import { BaseService } from './base.service';

@Injectable()
export class BoardService extends BaseService<Board, string> {
  constructor(protected _http: HttpClient) {
    super(_http, "boards");
  }
}
