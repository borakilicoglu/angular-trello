import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ListService } from '../services/list.service'
import { CardService } from '../services/card.service'

export interface List {
  name: string;
  description: string;
  done: boolean;
}

export interface Card {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() id: string;
  @ViewChild('input') searchElement: ElementRef;
  isLoading = false;
  list: Object;
  edited = false;
  cardName: string = '';
  cards: Card[];

  constructor(
    private listService: ListService,
    private cardService: CardService,
  ) { }

  ngOnInit() {
    this.listService.getList(this.id)
      .subscribe(list => {
        this.list = list;
        this.cards = list["cards"];
      });
  }

  addCard = (name: string, description: string, list: string) => {
    this.isLoading = true;
    this.cardService.createCard(name, description, list)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(data => {
        this.cardName = "";
        this.edited = false;
        this.cards.push(data);
      });
  }

  deleteCard = (id: string) => {
    this.cardService.deleteCard(id)
      .subscribe(data => {
        this.cards.splice(this.cards.findIndex(x => x.id === id), 1);
      });
  }

  toggleCard = () => {
    this.edited = !this.edited;
  }

}
