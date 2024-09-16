import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsComponent } from './trips.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterReviewerModule } from '../shared/components/footer-reviewer/footer-reviewer.module';
import { HeaderReviewerModule } from '../shared/components/header-reviewer/header-reviewer.module';
import { LoadingReviewerMaskModule } from '../shared/components/loading-reviewer-mask/loading-reviewer-mask.module';

@NgModule({
  declarations: [TripsComponent],
  imports: [
    CommonModule,
    HeaderReviewerModule,
    FooterReviewerModule,
    FontAwesomeModule,
    LoadingReviewerMaskModule,
  ],
  exports: [TripsComponent],
})
export class TripsModule {}
