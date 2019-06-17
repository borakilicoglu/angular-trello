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
  @Input() public deleteList: Function;
  @Input() id: string;
  cards: Card[];
  list: List;
  cardName: string;
  form = false;
  edit = false;

  @ViewChild('input') input: ElementRef;

  constructor(private listService: ListService, private cardService: CardService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.input.nativeElement && !e.target['classList'].contains('btn-danger')) {
        this.edit = false;
      }
    });
  }

  ngOnInit() {
    this.listService.read(this.id)
      .subscribe(list => {
        this.list = list;
        this.cards = list["cards"];
      });
  }

  updateList = (id: string, name: string, ) => {
    this.listService.update(id, { name }).subscribe((data: any) => {
      this.editName();
    });
  }

  editName = () => {
    this.edit = !this.edit;
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
