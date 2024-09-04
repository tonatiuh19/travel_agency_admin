import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PackageComponent } from './package/package.component';
import { CheckoutWizardComponent } from './checkout-wizard/checkout-wizard.component';

export const ReviewerRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'paquete/:id', component: PackageComponent },
  { path: 'checkout/:id', component: CheckoutWizardComponent },
];
