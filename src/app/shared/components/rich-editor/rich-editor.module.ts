import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichEditorComponent } from './rich-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [RichEditorComponent],
  imports: [CommonModule, CKEditorModule],
  exports: [RichEditorComponent],
})
export class RichEditorModule {}
