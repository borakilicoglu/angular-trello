import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CardService } from '../services/card.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @ViewChild('input') searchElement: ElementRef;
  @Input() card: Object;
  isReadOnly = true;

  constructor(
    private cardService: CardService,
  ) { }

  ngOnInit() {
  }

  editCard() {
    this.searchElement.nativeElement.focus();
    this.isReadOnly = !this.isReadOnly;
  }

  updateCard(id: string, name: string) {
    this.cardService.updateCard(id, name)
      .subscribe(data => {
        this.isReadOnly = true;
      });
  }

  deleteCard(list: string) {
    this.cardService.deleteCard(list)
      .subscribe(data => {
        console.log('Card deleted');
      });
  }
}
