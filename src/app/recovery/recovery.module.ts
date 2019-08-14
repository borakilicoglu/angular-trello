import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, RecoveryRoutingModule],
  declarations: [RecoveryComponent]
})
export class RecoveryModule {}
