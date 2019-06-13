import { Component, OnInit, Input } from '@angular/core';
import { ListService } from '../services/list.service'
import { CardService } from '../services/card.service'
import { Card } from '../card/card.interface';
import { List } from '../list/list.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() public deleteList: Function;
  @Input() id: string;
  cards: Card[];
  list: List;
  cardName: string;
  form = false;

  constructor(private listService: ListService, private cardService: CardService) { }

  ngOnInit() {
    this.listService.read(this.id)
      .subscribe(list => {
        this.list = list;
        this.cards = list["cards"];
      });
  }

  addCard = (parentId: string, name: string) => {
    this.cardService.createByParentId(parentId, "list", { name })
      .subscribe((data: any) => {
        this.cards = [...this.cards, data]
        this.toggleForm();
        this.cardName = "";
      });
  }

  deleteCard = (id: string) => {
    this.cardService.delete(id)
      .subscribe(data => {
        this.cards.splice(this.cards.findIndex(x => x.id === id), 1);
      });
  }

  toggleForm = () => {
    this.form = !this.form;
  }
}
