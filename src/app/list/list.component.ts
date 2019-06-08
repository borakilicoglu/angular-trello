import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ListService } from '../services/list.service'
import { CardService } from '../services/card.service'

export interface List {
  name: string;
  description: string;
  done: boolean;
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
  cards: string[] = [];

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

  addCard(name: string, description: string, list: string) {
    this.isLoading = true;
    this.cardService.createCard(name, description, list)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(data => {
        this.searchElement.nativeElement.value = '';
        this.cards.push(data);
      });
  }

  deleteCard(list: string) {
    this.cardService.deleteCard(list)
      .subscribe(data => {
        console.log('Card deleted');
      });
  }

  toggleCard() {
    this.edited = !this.edited;
  }

}
