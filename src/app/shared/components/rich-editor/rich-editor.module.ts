import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichEditorComponent } from './rich-editor.component';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RichEditorComponent],
  imports: [CommonModule, FormsModule, QuillModule.forRoot()],
  exports: [RichEditorComponent],
})
export class RichEditorModule {}
