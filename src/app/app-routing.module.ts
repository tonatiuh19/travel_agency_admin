import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { PackagesComponent } from './packages/packages.component';
import { FullScreenWizardNewPackageComponent } from './packages/components/full-screen-wizard/full-screen-wizard-new-package.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'bienvenido', component: WelcomeComponent },
  {
    path: 'paquetes',
    component: PackagesComponent,
  },
  {
    path: 'paquetes/nuevo-paquete',
    component: FullScreenWizardNewPackageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
