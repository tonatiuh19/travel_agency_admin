import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrl: './rich-editor.component.css',
})
export class RichEditorComponent {
  @Input() placeholder: string = '';
  @Input() editorDataInput: string = '';
  @Input() isDisabled: boolean = false;
  @Output() editorData = new EventEmitter<string>();

  onContentChanged(event: any): void {
    this.editorData.emit(event.html);
  }
}
