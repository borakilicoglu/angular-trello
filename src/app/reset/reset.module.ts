import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
import { ResetRoutingModule } from './reset-routing.module';
import { ResetComponent } from './reset.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, SharedModule, NgbModule, ResetRoutingModule],
  declarations: [ResetComponent]
})
export class ResetModule {}
