import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BoardService } from '../services/board.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private sub: any;
  isLoading = false;
  name: string;
  lists: Object;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.sub = this.route.params.subscribe(params => {
      this.boardService.getBoard(params['id'])
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(data => {
          this.lists = data.lists;
          this.name = data.name;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
