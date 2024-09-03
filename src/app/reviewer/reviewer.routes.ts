import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PackageComponent } from './package/package.component';

export const ReviewerRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'paquete', component: PackageComponent },
];
