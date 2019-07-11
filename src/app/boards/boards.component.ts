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
  recentlyBoards: Board[];
  persoanlBoards: Board[];

  constructor(
    private boardService: BoardService,
    private router: Router,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {
    this.boardService.findAll().subscribe(data => {
      this.boards = [...data];
      this.starredBoards = data.filter(x => x.star == true);
      const credentials = this.credentialsService.credentials;
      this.persoanlBoards = data.filter(x => x.author.id == credentials.id);
      if (JSON.parse(localStorage.getItem('recentlyBoards')))
        this.recentlyBoards = JSON.parse(localStorage.getItem('recentlyBoards'));
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

  setRecentlyBoards(id: string) {
    if (this.recentlyBoards) {
      this.recentlyBoards = this.recentlyBoards.filter((item: any) => item.id !== id);
      this.recentlyBoards.unshift(this.boards.find(x => x.id == id));
    } else {
      this.recentlyBoards = this.boards.filter(x => x.id == id);
    }
    localStorage.setItem('recentlyBoards', JSON.stringify(this.recentlyBoards));
  }

  goToBoard(id: string) {
    this.setRecentlyBoards(id);
    this.router.navigate(['/board', id]), { replaceUrl: true };
  }
}
