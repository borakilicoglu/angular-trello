import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { QuoteService } from './quote.service';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, BoardsRoutingModule],
  declarations: [BoardsComponent],
  providers: [QuoteService]
})
export class BoardsModule { }
