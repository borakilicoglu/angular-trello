import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CardService } from '../services/card.service';
import { Card } from '../card/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public deleteCard: Function;
  @Input() card: Card;
  @ViewChild('cardName') cardName: ElementRef;
  isReadOnly = true;

  constructor(private cardService: CardService) {}

  ngOnInit() {}

  editCard() {
    this.cardName.nativeElement.focus();
    this.isReadOnly = !this.isReadOnly;
  }

  updateCard(id: string, name: string) {
    this.cardService.update(id, { name }).subscribe((data: any) => {
      this.isReadOnly = true;
    });
  }
}
