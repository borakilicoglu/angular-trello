import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './loader/loader.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [LoaderComponent, AddComponent],
  exports: [LoaderComponent, AddComponent]
})
export class SharedModule {}
