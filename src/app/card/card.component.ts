import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @ViewChild('input') searchElement: ElementRef;
  @Input() card: Object;
  edited = false;
  isReadOnly = true;

  constructor() { }

  ngOnInit() {
  }

  toggleCard() {
    this.edited = !this.edited;
  }

  editCard() {
    this.searchElement.nativeElement.focus();
    this.isReadOnly = !this.isReadOnly;
  }
}
