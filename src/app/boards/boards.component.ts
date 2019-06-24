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

  constructor(private boardService: BoardService, private router: Router) {}

  ngOnInit() {
    this.boardService.findAll().subscribe(data => {
      this.boards = data;
    });
    this.boardService.listen().subscribe((data: any) => {
      this.boards = [...this.boards, data];
    });
  }

  starToggle = (id: string) => {
    this.boards.find(board => board.id == id).star ? this.removeStar(id) : this.addStar(id);
  };

  addStar = (id: string, name?: string) => {
    this.boardService.addStar(id, { name }).subscribe((data: any) => {
      this.boards.find(board => board.id == id).star = data;
    });
  };

  removeStar = (id: string) => {
    this.boardService.removeStar(id).subscribe((data: any) => {
      this.boards.find(board => board.id == id).star = data;
    });
  };

  create = (name: string) => {
    this.boardService.create({ name }).subscribe(data => {
      console.log('New board generated!');
    });
  };

  goToBoard(id: string) {
    this.router.navigate(['/board', id]), { replaceUrl: true };
  }
}
