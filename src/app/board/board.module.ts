import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { ListComponent } from './list/list.component';
// import { QuoteService } from './quote.service';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, BoardRoutingModule],
  declarations: [BoardComponent, ListComponent],
  providers: []
})
export class BoardModule { }
