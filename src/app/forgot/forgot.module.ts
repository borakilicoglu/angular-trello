import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';

import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, SharedModule, NgbModule, ForgotRoutingModule],
  declarations: [ForgotComponent]
})
export class ForgotModule {}
