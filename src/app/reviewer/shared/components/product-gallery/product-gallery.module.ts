import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGalleryComponent } from './product-gallery.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ProductGalleryComponent],
  imports: [CommonModule, CarouselModule, BrowserAnimationsModule],
  exports: [ProductGalleryComponent],
})
export class ProductGalleryModule {}
