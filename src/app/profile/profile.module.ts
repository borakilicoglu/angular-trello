import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '@app/shared';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule, TranslateModule, NgbModule, ProfileRoutingModule],
  declarations: [ProfileComponent]
})
export class ProfileModule {}
