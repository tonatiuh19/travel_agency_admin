import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSelectComponent } from './location-select.component';
import { LoadingModule } from '../loading/loading/loading.module';

@NgModule({
  declarations: [LocationSelectComponent],
  imports: [CommonModule, LoadingModule],
  exports: [LocationSelectComponent],
})
export class LocationSelectModule {}
