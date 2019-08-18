import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './loader/loader.component';
import { AddComponent } from './add/add.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [LoaderComponent, AddComponent, AlertComponent],
  exports: [LoaderComponent, AddComponent, AlertComponent]
})
export class SharedModule {}
