import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private _success = new Subject<string>();
  @Input() data: any;
  // staticAlertClosed = false;
  mal: string;
  class: string;

  ngOnInit(): void {
    // setTimeout(() => this.staticAlertClosed = true, 20000);
  }

  ngOnChanges() {
    this.data ? this.setMessage(this.data) : null;
  }

  setMessage = (data: any) => {
    console.log(data);
    this.class = data.class;
    this._success.subscribe(message => (this.mal = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => (this.mal = null));
    this._success.next(data.text);
  };
}
