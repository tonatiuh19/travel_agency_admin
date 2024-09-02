import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenWizardComponent } from './full-screen-wizard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RichEditorModule } from '../rich-editor/rich-editor.module';

@NgModule({
  declarations: [FullScreenWizardComponent],
  imports: [CommonModule, ReactiveFormsModule, RichEditorModule],
  exports: [FullScreenWizardComponent],
})
export class FullScreenWizardModule {}
