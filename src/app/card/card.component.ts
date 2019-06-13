import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CardService } from '../services/card.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public deleteCard: Function;
  @ViewChild('input') searchElement: ElementRef;
  @Input() card: Object;
  isReadOnly = true;

  constructor(private cardService: CardService) { }

  ngOnInit() { }

  editCard() {
    this.searchElement.nativeElement.focus();
    this.isReadOnly = !this.isReadOnly;
  }

  updateCard(id: string, name: string) {
    this.cardService.update(id, { name })
      .subscribe((data: any) => {
        this.isReadOnly = true;
      });
  }
}
