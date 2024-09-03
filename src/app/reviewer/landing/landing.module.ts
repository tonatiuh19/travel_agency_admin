import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { ReviewCardModule } from '../shared/components/review-card/review-card.module';
import { PackageCardModule } from '../shared/components/package-card/package-card.module';
import { PlaceCardModule } from '../shared/components/place-card/place-card.module';
import { PackageImageCardModule } from '../shared/components/package-image-card/package-image-card.module';
import { HeaderReviewerModule } from '../shared/components/header-reviewer/header-reviewer.module';
import { FooterReviewerModule } from '../shared/components/footer-reviewer/footer-reviewer.module';
import { LandingStoreModule } from './store/landing.store.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReviewsCarouselModule } from './reviews-carousel/reviews-carousel.module';
import { LoadingReviewerMaskModule } from '../shared/components/loading-reviewer-mask/loading-reviewer-mask.module';

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
    LandingStoreModule,
    FontAwesomeModule,
    ReviewsCarouselModule,
    LoadingReviewerMaskModule,
  ],
  exports: [LandingComponent],
})
export class LandingModule {}
