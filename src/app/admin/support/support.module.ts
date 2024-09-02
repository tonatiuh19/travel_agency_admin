import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { FullLoadingMaskModule } from '../shared/components/full-loading-mask/full-loading-mask.module';

@NgModule({
  declarations: [SupportComponent],
  imports: [CommonModule, HeaderModule, FooterModule, FullLoadingMaskModule],
  exports: [SupportComponent],
})
export class SupportModule {}
