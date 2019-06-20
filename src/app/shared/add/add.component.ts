import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input() create: Function;
  @Input() name: string;
  @Input() id: string;
  show = true;
  title: string;

  constructor() {}

  ngOnInit() {}

  add = (title: string, id?: string) => {
    this.create(title, id);
    this.title = '';
    this.toggle();
  };

  toggle = () => {
    this.show = !this.show;
  };
}
