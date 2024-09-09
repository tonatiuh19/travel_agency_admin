import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentStatusComponent } from './payment-status.component';
import { HeaderReviewerModule } from '../shared/components/header-reviewer/header-reviewer.module';
import { FooterReviewerModule } from '../shared/components/footer-reviewer/footer-reviewer.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingReviewerMaskModule } from '../shared/components/loading-reviewer-mask/loading-reviewer-mask.module';

@NgModule({
  declarations: [PaymentStatusComponent],
  imports: [
    CommonModule,
    HeaderReviewerModule,
    FooterReviewerModule,
    FontAwesomeModule,
    LoadingReviewerMaskModule,
  ],
  exports: [PaymentStatusComponent],
})
export class PaymentStatusModule {}
