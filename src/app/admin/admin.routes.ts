import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PackagesComponent } from './packages/packages.component';
import { FullScreenWizardNewPackageComponent } from './packages/components/full-screen-wizard/full-screen-wizard-new-package.component';
import { FullEditScreenWizardComponent } from './packages/components/full-edit-screen-wizard/full-edit-screen-wizard.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';

export const AdminRoutes: Routes = [
  { path: 'admin/bienvenido', component: WelcomeComponent },
  {
    path: 'admin/paquetes',
    component: PackagesComponent,
  },
  {
    path: 'admin/paquetes/nuevo-paquete',
    component: FullScreenWizardNewPackageComponent,
  },
  {
    path: 'admin/paquetes/editar-paquete/:id',
    component: FullEditScreenWizardComponent,
  },
  {
    path: 'admin/ajustes',
    component: SettingsComponent,
  },
  {
    path: 'admin/soporte',
    component: SupportComponent,
  },
];
