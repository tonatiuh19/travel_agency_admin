import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutes } from './admin/admin.routes';
import { LoginComponent } from './admin/login/login.component';
import { ReviewerRoutes } from './reviewer/reviewer.routes';

const appRoutes: Routes = [
  { path: 'admin', component: LoginComponent },
  ...AdminRoutes,
  ...ReviewerRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
