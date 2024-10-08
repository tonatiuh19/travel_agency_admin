import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenWizardNewPackageComponent } from './full-screen-wizard-new-package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LocationSelectModule } from '../../../shared/components/location-select/location-select.module';
import { PackageStoreModule } from '../../store/package.store.module';
import { FullLoadingMaskModule } from '../../../shared/components/full-loading-mask/full-loading-mask.module';
import { RichEditorModule } from '../../../shared/components/rich-editor/rich-editor.module';

@NgModule({
  declarations: [FullScreenWizardNewPackageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    LocationSelectModule,
    PackageStoreModule,
    FullLoadingMaskModule,
    RichEditorModule,
  ],
  exports: [FullScreenWizardNewPackageComponent],
  providers: [],
})
export class FullScreenWizardNewPackageModule {}
