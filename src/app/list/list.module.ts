import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { CardModule } from '../card/card.module';
import { ListComponent } from './list.component';
import { ListService } from '../services/list.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CoreModule,
    CardModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ListComponent],
  providers: [ListService],
  exports: [ListComponent]
})
export class ListModule {}
