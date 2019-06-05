import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  boards: any;

  constructor(
    private quoteService: QuoteService,
    private boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });

    this.boardService.getBoards().subscribe(data => {
      this.boards = data;
    });
  }

  public goToBoard(id: string) {
    this.router.navigate(['/board', id]), { replaceUrl: true }
  }
}
