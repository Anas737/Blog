import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostComponent } from './post';
import { ModalComponent } from './modal';

@NgModule({
  declarations: [ModalComponent, PostComponent],
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, ModalComponent, PostComponent],
})
export class SharedModule {}
