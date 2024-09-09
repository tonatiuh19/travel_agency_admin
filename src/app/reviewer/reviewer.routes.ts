import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PackageComponent } from './package/package.component';
import { CheckoutWizardComponent } from './checkout-wizard/checkout-wizard.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';

export const ReviewerRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'paquete/:id', component: PackageComponent },
  { path: 'checkout/:id', component: CheckoutWizardComponent },
  { path: 'gracias/:id', component: PaymentStatusComponent },
];
