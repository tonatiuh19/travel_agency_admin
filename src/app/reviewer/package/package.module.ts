import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageComponent } from './package.component';
import { HeaderReviewerModule } from '../shared/components/header-reviewer/header-reviewer.module';
import { FooterReviewerModule } from '../shared/components/footer-reviewer/footer-reviewer.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductGalleryModule } from '../shared/components/product-gallery/product-gallery.module';
import { LoadingReviewerMaskModule } from '../shared/components/loading-reviewer-mask/loading-reviewer-mask.module';

@NgModule({
  declarations: [PackageComponent],
  imports: [
    CommonModule,
    HeaderReviewerModule,
    FooterReviewerModule,
    FontAwesomeModule,
    ProductGalleryModule,
    LoadingReviewerMaskModule,
  ],
  exports: [PackageComponent],
})
export class PackageModule {}
