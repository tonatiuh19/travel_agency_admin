import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenWizardComponent } from './full-screen-wizard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FullScreenWizardComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FullScreenWizardComponent],
})
export class FullScreenWizardModule {}
