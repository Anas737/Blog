import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from 'src/app/shared';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';

@NgModule({
  imports: [PostRoutingModule, SharedModule, CKEditorModule],
  declarations: [PostComponent],
})
export class PostModule {}
