import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsCarouselComponent } from './reviews-carousel.component';
import { ReviewCardModule } from '../../shared/components/review-card/review-card.module';

@NgModule({
  declarations: [ReviewsCarouselComponent],
  imports: [CommonModule, ReviewCardModule],
  exports: [ReviewsCarouselComponent],
})
export class ReviewsCarouselModule {}
