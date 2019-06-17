import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('input') input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private listService: ListService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      console.log(e.target['classList'])
      if (e.target !== this.input.nativeElement && !e.target['classList'].contains('btn-danger')) {
        this.edit = false;
      }
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.boardService.read(params['id'])
        .subscribe((data: Board) => {
          this.board = data
          this.lists = data["lists"];
        });
    });
  }

  updateBoard = (id: string, name: string) => {
    this.boardService.update(id, { name }).subscribe((data: any) => {
      this.editName();
    });
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

  editName = () => {
    this.edit = !this.edit;
  }
}
