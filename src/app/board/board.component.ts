import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../services/board.service'
import { ListService } from '../services/list.service'
import { List } from '@app/list/list.interface';
import { Board } from '@app/board/board.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private sub: any;
  board: Board;
  lists: List[];
  listName: string;
  form = true;
  edit = false;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.boardService.read(params['id'])
        .subscribe((data: Board) => {
          this.board = data
          this.lists = data["lists"];
        });
    });
  }

  editName = (name: string, id: string) => {
    this.edit = !false;
    console.log(name)
  }

  addList = (parentId: string, name: string) => {
    this.listService.createByParentId(parentId, "board", { name })
      .subscribe((data: any) => {
        this.lists = [...this.lists, data]
        this.toggleForm();
        this.listName = "";
      });
  }

  deleteList = (id: string) => {
    this.listService.delete(id)
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
