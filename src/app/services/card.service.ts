import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '@app/card/card.interface';
import { BaseService } from './base.service';

@Injectable()
export class CardService extends BaseService<Card, string> {
  constructor(protected _http: HttpClient) {
    super(_http, "cards");
  }
}
