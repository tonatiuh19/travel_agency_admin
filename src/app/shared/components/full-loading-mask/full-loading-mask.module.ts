import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLoadingMaskComponent } from './full-loading-mask.component';

@NgModule({
  declarations: [FullLoadingMaskComponent],
  imports: [CommonModule],
  exports: [FullLoadingMaskComponent],
})
export class FullLoadingMaskModule {}
