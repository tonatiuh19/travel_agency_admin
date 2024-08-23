import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenWizardNewPackageComponent } from './full-screen-wizard-new-package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [FullScreenWizardNewPackageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  exports: [FullScreenWizardNewPackageComponent],
  providers: [],
})
export class FullScreenWizardNewPackageModule {}
