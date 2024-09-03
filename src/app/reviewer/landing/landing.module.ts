import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { ReviewCardModule } from '../shared/components/review-card/review-card.module';
import { PackageCardModule } from '../shared/components/package-card/package-card.module';
import { PlaceCardModule } from '../shared/components/place-card/place-card.module';
import { PackageImageCardModule } from '../shared/components/package-image-card/package-image-card.module';
import { HeaderReviewerModule } from '../shared/components/header-reviewer/header-reviewer.module';
import { FooterReviewerModule } from '../shared/components/footer-reviewer/footer-reviewer.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    HeaderReviewerModule,
    FooterReviewerModule,
    ReviewCardModule,
    PackageCardModule,
    PlaceCardModule,
    PackageImageCardModule,
  ],
  exports: [LandingComponent],
})
export class LandingModule {}
