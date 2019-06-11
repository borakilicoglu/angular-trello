import { Component, OnInit, Input } from '@angular/core';
import { ListService } from '../services/list.service'
import { CardService } from '../services/card.service'

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
  @Input() public deleteList: Function;
  @Input() id: string;
  cards: Card[];
  list: Object;
  cardName: string;
  form = false;

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
    this.cardService.createCard(name, description, list)
      .subscribe(data => {
        this.cards = [...this.cards, data]
        this.toggleForm();
        this.cardName = "";
      });
  }

  deleteCard = (id: string) => {
    this.cardService.deleteCard(id)
      .subscribe(data => {
        this.cards.splice(this.cards.findIndex(x => x.id === id), 1);
      });
  }

  toggleForm = () => {
    this.form = !this.form;
  }

}
