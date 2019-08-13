import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RecoverRoutingModule } from './recover-routing.module';
import { RecoverComponent } from './recover.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, RecoverRoutingModule],
  declarations: [RecoverComponent]
})
export class RecoverModule {}
