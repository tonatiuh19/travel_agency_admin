import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { FullLoadingMaskModule } from '../shared/components/full-loading-mask/full-loading-mask.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { HeaderModule } from '../shared/components/header/header.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsStoreModule } from './store/settings.store.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FullLoadingMaskModule,
    HeaderModule,
    FooterModule,
    FontAwesomeModule,
    SettingsStoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
