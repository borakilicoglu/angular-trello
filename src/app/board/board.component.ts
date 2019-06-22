import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../services/board.service';
import { ListService } from '../services/list.service';
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
  edit: boolean = false;

  @ViewChild('boardName') boardName: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private listService: ListService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.boardService.read(params['id']).subscribe((data: Board) => {
        this.board = data;
        this.lists = data['lists'];
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.listen('window', 'click', (e: Event) => {
        if (this.edit && e.target !== this.boardName.nativeElement && !e.target['classList'].contains('board-name')) {
          this.updateBoard(this.board.id, this.board.name);
        }
      });
    }, 15);
  }

  starToggle = (id: string) => {
    this.board.star ? this.removeStar(id) : this.addStar(id);
  };

  addStar = (id: string, name?: string) => {
    this.boardService.addStar(id, { name }).subscribe((data: any) => {
      this.board.star = data;
      this.edit = false;
    });
  };

  removeStar = (id: string) => {
    this.boardService.removeStar(id).subscribe((data: any) => {
      this.board.star = data;
      this.edit = false;
    });
  };

  updateBoard = (id: string, name: string) => {
    this.boardService.update(id, { name }).subscribe((data: any) => {
      this.edit = false;
    });
  };

  create = (name: string, id: string) => {
    this.listService.createByParentId(id, 'board', { name }).subscribe((data: any) => {
      this.lists = [...this.lists, data];
    });
  };

  delete = (id: string) => {
    this.listService.delete(id).subscribe(data => {
      this.lists.splice(this.lists.findIndex(x => x.id === id), 1);
    });
  };

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
