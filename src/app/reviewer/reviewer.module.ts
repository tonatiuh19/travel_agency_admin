import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewerComponent } from './reviewer.component';
import { LandingModule } from './landing/landing.module';
import { PackageModule } from './package/package.module';
import { CheckoutWizardModule } from './checkout-wizard/checkout-wizard.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { TripsModule } from './trips/trips.module';

@NgModule({
  declarations: [ReviewerComponent],
  imports: [
    CommonModule,
    LandingModule,
    PackageModule,
    CheckoutWizardModule,
    PaymentStatusModule,
    TripsModule,
  ],
  exports: [ReviewerComponent],
})
export class ReviewerModule {}
