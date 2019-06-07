import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { BoardRoutingModule } from './board-routing.module';
import { ListModule } from '../list/list.module';
import { BoardComponent } from './board.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, ListModule, BoardRoutingModule],
  declarations: [BoardComponent],
  providers: []
})
export class BoardModule { }
