import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../services/board.service';
import { Board } from '@app/board/board.interface';

import { AuthenticationService, CredentialsService, I18nService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: Board[];
  starredBoards: Board[];
  recentlyBoards: Board[] = [];
  recentlyOrder: any[] = [];
  personalBoards: Board[] = [];

  constructor(
    private boardService: BoardService,
    private router: Router,
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.boardService.findAll().subscribe(data => {
      this.boards = [...data];
      this.starredBoards = data.filter(x => x.star == true);
      const credentials = this.credentialsService.credentials;
      this.personalBoards = data.filter(x => x.author.id == credentials.id);
      this.setRecentlyBoards(data);
    });
    this.boardService.listen().subscribe((data: Board) => {
      this.boards = [...this.boards, data];
    });
  }

  setRecentlyBoards(data: Array<any>) {
    if (JSON.parse(localStorage.getItem('recentlyOrder'))) {
      this.recentlyOrder = JSON.parse(localStorage.getItem('recentlyOrder'));
      this.recentlyOrder.map((e: Board) => {
        let result = data.find(a => a.id == e);
        result !== undefined ? (this.recentlyBoards = [...this.recentlyBoards, result]) : false;
      });
    }
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

  setRecentlyOrder(id: string) {
    if (this.recentlyOrder) {
      this.recentlyOrder = this.recentlyOrder.filter((item: any) => item !== id);
      this.recentlyOrder.unshift(id);
    } else {
      this.recentlyOrder.push(id);
    }
    localStorage.setItem('recentlyOrder', JSON.stringify(this.recentlyOrder));
  }

  goToBoard(id: string) {
    this.setRecentlyOrder(id);
    this.router.navigate(['/board', id]), { replaceUrl: true };
  }
}
