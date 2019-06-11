import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../services/board.service'
import { ListService } from '../services/list.service'

export interface Board {
  name: string;
  author: Object;
  lists: any;
}

export interface List {
  id: string;
  name: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private sub: any;
  lists: List[];
  board: Object;
  listName: string;
  form = true;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.boardService.getBoard(params['id'])
        .subscribe(data => {
          this.board = data
          this.lists = data["lists"];
        });
    });
  }

  addList = (boardId: string, name: string) => {
    this.listService.addList(boardId, name)
      .subscribe(data => {
        this.lists = [...this.lists, data]
        this.toggleForm();
        this.listName = "";
      });
  }

  deleteList = (id: string) => {
    this.listService.deleteList(id)
      .subscribe(data => {
        this.lists.splice(this.lists.findIndex(x => x.id === id), 1);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleForm = () => {
    this.form = !this.form;
  }

}
