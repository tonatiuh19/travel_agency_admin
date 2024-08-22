import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenWizardNewPackageComponent } from './full-screen-wizard-new-package.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FullScreenWizardNewPackageComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FullScreenWizardNewPackageComponent],
  providers: [],
})
export class FullScreenWizardNewPackageModule {}
