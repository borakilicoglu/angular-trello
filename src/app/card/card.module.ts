import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { CardComponent } from './card.component';
import { CardService } from '../services/card.service';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [CardComponent],
  providers: [CardService],
  exports: [CardComponent]
})
export class CardModule {}
