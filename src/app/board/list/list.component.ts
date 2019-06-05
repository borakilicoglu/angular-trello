import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ListService } from '../../services/list.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() id: string;
  isLoading = false;
  edited = false;
  list: Object;
  cards: Object;

  constructor(
    private listService: ListService,
  ) { }

  ngOnInit() {
    this.listService.getList(this.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(data => {
        this.list = data;
        this.cards = data["cards"];
      });
  }

  addCard() {
    this.edited = true;
    console.log(this.edited);
  }

}
