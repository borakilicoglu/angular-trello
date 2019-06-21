import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ListService } from '../services/list.service';
import { CardService } from '../services/card.service';
import { Card } from '../card/card.interface';
import { List } from '../list/list.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() public delete: Function;
  @Input() id: string;
  cards: Card[];
  list: List;
  edit: boolean = false;

  @ViewChild('listName') listName: ElementRef;

  constructor(private listService: ListService, private cardService: CardService, private renderer: Renderer2) {}

  ngOnInit() {
    this.listService.read(this.id).subscribe(list => {
      this.list = list;
      this.cards = list['cards'];
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.listen('window', 'click', (e: Event) => {
        if (this.edit && e.target !== this.listName.nativeElement && !e.target['classList'].contains('list-title')) {
          this.updateList(this.list.id, this.list.name);
        }
      });
    }, 15);
  }

  updateList = (id: string, name: string) => {
    this.listService.update(id, { name }).subscribe((data: any) => {
      this.edit = false;
    });
  };

  create = (name: string, id: string) => {
    this.cardService.createByParentId(id, 'list', { name }).subscribe((data: any) => {
      this.cards = [...this.cards, data];
    });
  };

  deleteCard = (id: string) => {
    this.cardService.delete(id).subscribe(data => {
      this.cards.splice(this.cards.findIndex(x => x.id === id), 1);
    });
  };
}
