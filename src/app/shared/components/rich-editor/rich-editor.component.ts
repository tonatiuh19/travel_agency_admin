import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

@Component({
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrl: './rich-editor.component.css',
})
export class RichEditorComponent {
  @Output() editorData = new EventEmitter<string>();

  @Input() placeholder = '';

  @Input() editorDataInput = '';

  public Editor = ClassicEditor;
  public config = {
    placeholder: this.placeholder,
    toolbar: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'link',
      'insertTable',
      'mediaEmbed',
      '|',
      'bulletedList',
      'numberedList',
      'indent',
      'outdent',
    ],
    plugins: [
      Bold,
      Essentials,
      Heading,
      Indent,
      IndentBlock,
      Italic,
      Link,
      List,
      MediaEmbed,
      Paragraph,
      Table,
      Undo,
    ],
  };

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.editorData.emit(data);
  }
}
