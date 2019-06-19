import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
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
  @Input() public delete: Function;
  @Input() id: string;
  cards: Card[];
  list: List;
  edit: boolean = false

  @ViewChild('input') input: ElementRef;

  constructor(private listService: ListService, private cardService: CardService, private renderer: Renderer2) { }

  ngOnInit() {
    this.listService.read(this.id).subscribe(list => {
      this.list = list;
      this.cards = list["cards"];
    });
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.input.nativeElement && !e.target['classList'].contains('list-title')) {
        this.edit = false;
      }
    });
  }

  updateList = (id: string, name: string, event: any) => {
    event.srcElement.blur();
    event.preventDefault();
    this.listService.update(id, { name }).subscribe((data: any) => {
      this.edit = !this.edit;
    });
  }

  create = (name: string, id: string) => {
    this.cardService.createByParentId(id, "list", { name })
      .subscribe((data: any) => {
        this.cards = [...this.cards, data]
      });
  }

  deleteCard = (id: string) => {
    this.cardService.delete(id)
      .subscribe(data => {
        this.cards.splice(this.cards.findIndex(x => x.id === id), 1);
      });
  }
}
