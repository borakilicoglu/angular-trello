import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { CardService } from '../services/card.service'
import { Card } from '../card/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public deleteCard: Function;
  @ViewChild('cardName') cardName: ElementRef;
  @Input() card: Card;
  isReadOnly = true;


  constructor(private cardService: CardService, private renderer: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.listen('window', 'click', (e: Event) => {
        if (e.target !== this.cardName.nativeElement && !e.target['classList'].contains('fa-times') && !e.target['classList'].contains('fa-edit')) {
          this.updateCard(this.card.id, this.card.name)
        }
      });
    }, 15);
  }

  editCard() {
    this.cardName.nativeElement.focus();
    this.isReadOnly = !this.isReadOnly;
  }

  updateCard(id: string, name: string) {
    this.cardService.update(id, { name })
      .subscribe((data: any) => {
        this.isReadOnly = true;
      });
  }
}
