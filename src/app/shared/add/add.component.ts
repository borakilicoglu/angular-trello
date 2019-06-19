import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input() create: Function;
  @Input() parent: string;
  show = true
  name: string

  constructor() { }

  ngOnInit() {
  }

  add = (name: string) => {
    this.create(name);
    this.toggle();
    this.name = "";
  }

  toggle = () => {
    this.show = !this.show;
  }

}
