import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { BoardService } from '../services/board.service';


@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, BoardsRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [BoardsComponent],
  providers: [BoardService]
})
export class BoardsModule { }
