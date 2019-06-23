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

  constructor(private boardService: BoardService, private router: Router) { }

  ngOnInit() {
    this.boardService.findAll().subscribe(data => {
      this.boards = data;
    });
    this.boardService.listen().subscribe((data: any) => {
      this.boards = [...this.boards, data];
    });
  }

  create = (name: string) => {
    this.boardService.create({ name }).subscribe(data => {
      console.log('New board generated!');
    });
  };

  delete = (id: string) => {
    this.boardService.delete(id).subscribe(data => {
      this.boards.splice(this.boards.findIndex(x => x.id === id), 1);
    });
  };

  goToBoard(id: string) {
    this.router.navigate(['/board', id]), { replaceUrl: true };
  }
}
