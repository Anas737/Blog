import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './modal';
import { RouterModule } from '@angular/router';
import { PostComponent } from './post';

@NgModule({
  declarations: [ModalComponent, PostComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    PostComponent,
  ],
})
export class SharedModule {}
