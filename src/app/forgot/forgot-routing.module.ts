import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ForgotComponent } from './forgot.component';

const routes: Routes = [{ path: 'auth/forgot', component: ForgotComponent, data: { title: extract('Forgot') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ForgotRoutingModule {}
