import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BoardService } from '../services/board.service'
import { ListService } from '../services/list.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private sub: any;
  isLoading = false;
  name: string;
  board: Object;
  active = true;
  listName: string = '';

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private listService: ListService
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
          this.board = data
        });
    });
  }

  addList = (boardId: string, name: string) => {
    this.isLoading = true;
    this.listService.addList(boardId, name)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(data => {
        console.log(data)
        // this.cardName = "";
        // this.edited = false;
        // this.cards.push(data);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleActive = () => {
    this.active = !this.active;
  }

}
