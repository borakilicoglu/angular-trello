import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ResetComponent } from './reset.component';

const routes: Routes = [{ path: 'auth/reset/:params', component: ResetComponent, data: { title: extract('Reset') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ResetRoutingModule {}
