import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeGeneratorComponent } from './barcode-generator.component';
import { NgxBarcode6Module } from 'ngx-barcode6';

@NgModule({
  declarations: [BarcodeGeneratorComponent],
  imports: [CommonModule, NgxBarcode6Module],
  exports: [BarcodeGeneratorComponent],
})
export class BarcodeGeneratorModule {}
