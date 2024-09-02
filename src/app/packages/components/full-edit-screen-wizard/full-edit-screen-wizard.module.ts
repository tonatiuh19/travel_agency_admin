import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullEditScreenWizardComponent } from './full-edit-screen-wizard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LocationSelectModule } from '../../../shared/components/location-select/location-select.module';
import { PackageStoreModule } from '../../store/package.store.module';
import { FullLoadingMaskModule } from '../../../shared/components/full-loading-mask/full-loading-mask.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RichEditorModule } from '../../../shared/components/rich-editor/rich-editor.module';
import { SanitizeHtmlPipePipe } from '../../../shared/pipes/sanitize-html-pipe.pipe';

@NgModule({
  declarations: [FullEditScreenWizardComponent, SanitizeHtmlPipePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    LocationSelectModule,
    PackageStoreModule,
    FullLoadingMaskModule,
    FontAwesomeModule,
    RichEditorModule,
  ],
  exports: [FullEditScreenWizardComponent],
  providers: [],
})
export class FullEditScreenWizardModule {}
