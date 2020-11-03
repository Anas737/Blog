import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostComponent } from './post';
import { ModalComponent } from './modal';

@NgModule({
  declarations: [ModalComponent, PostComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    PostComponent,
  ],
})
export class SharedModule {}
