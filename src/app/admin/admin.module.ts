import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HeaderModule } from './shared/components/header/header.module';
import { FooterModule } from './shared/components/footer/footer.module';
import { LoginModule } from './login/login.module';
import { WelcomeModule } from './welcome/welcome.module';
import { PackagesModule } from './packages/packages.module';
import { FullScreenWizardNewPackageModule } from './packages/components/full-screen-wizard/full-screen-wizard-new-package.module';
import { FullEditScreenWizardModule } from './packages/components/full-edit-screen-wizard/full-edit-screen-wizard.module';
import { SettingsModule } from './settings/settings.module';
import { SupportModule } from './support/support.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    LoginModule,
    WelcomeModule,
    PackagesModule,
    FullScreenWizardNewPackageModule,
    FullEditScreenWizardModule,
    SettingsModule,
    SupportModule,
  ],
  exports: [AdminComponent],
  providers: [],
})
export class AdminModule {}
