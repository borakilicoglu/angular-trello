import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../services/board.service';
import { Board } from '@app/board/board.interface';


@Component({
  selector: 'app-home',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: Board[];
  boardName: string;
  form = true;

  constructor(
    private boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.boardService.findAll().subscribe(data => {
      this.boards = data;
    });
  }

  addBoard = (name: string) => {
    this.boardService.create({ name }).subscribe(data => {
      this.boards = [...this.boards, data]
      this.toggleForm();
      this.boardName = "";
    });
  }

  deleteBoard = (id: string) => {
    this.boardService.delete(id)
      .subscribe(data => {
        this.boards.splice(this.boards.findIndex(x => x.id === id), 1);
      });
  }

  toggleForm = () => {
    this.form = !this.form;
  }

  public goToBoard(id: string) {
    this.router.navigate(['/board', id]), { replaceUrl: true }
  }
}
