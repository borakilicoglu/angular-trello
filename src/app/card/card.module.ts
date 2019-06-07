import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { CardComponent } from './card.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule],
  declarations: [CardComponent],
  providers: [],
  exports: [CardComponent]
})
export class CardModule { }