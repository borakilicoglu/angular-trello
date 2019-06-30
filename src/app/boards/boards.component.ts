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
  starredBoards: Board[];
  recentlyBoards: Board[];
  viewedOrder: string[] = [];

  constructor(private boardService: BoardService, private router: Router) {}

  ngOnInit() {
    this.boardService.findAll().subscribe(data => {
      this.boards = [...data];
      this.starredBoards = data.filter(x => x.star == true);
      if (JSON.parse(localStorage.getItem('viewedOrder'))) {
        this.viewedOrder = JSON.parse(localStorage.getItem('viewedOrder'));
        this.recentlyBoards = data.sort((a, b) => this.viewedOrder.indexOf(a.id) - this.viewedOrder.indexOf(b.id));
      }
    });
    this.boardService.listen().subscribe((data: Board) => {
      this.boards = [...this.boards, data];
    });
  }

  starToggle = (id: string) => {
    this.boards.find(board => board.id == id).star ? this.removeStar(id) : this.addStar(id);
  };

  starredBoardsToggle = () => {
    this.starredBoards = this.boards.filter(x => x.star == true);
  };

  addStar = (id: string, name?: string) => {
    this.boardService.addStar(id, { name }).subscribe((data: any) => {
      this.boards.find(board => board.id == id).star = data;
      this.starredBoardsToggle();
    });
  };

  removeStar = (id: string) => {
    this.boardService.removeStar(id).subscribe((data: any) => {
      this.boards.find(board => board.id == id).star = data;
      this.starredBoardsToggle();
    });
  };

  create = (name: string) => {
    this.boardService.create({ name }).subscribe(data => {
      console.log('New board generated!');
    });
  };

  goToBoard(id: string) {
    this.router.navigate(['/board', id]), { replaceUrl: true };
    this.viewedOrder.unshift(id);
    localStorage.setItem('viewedOrder', JSON.stringify(this.viewedOrder));
  }
}
