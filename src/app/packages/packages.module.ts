import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages.component';
import { LoginModule } from '../login/login.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { HeaderModule } from '../shared/components/header/header.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PackagesComponent],
  imports: [
    CommonModule,
    LoginModule,
    FooterModule,
    HeaderModule,
    FontAwesomeModule,
  ],
  exports: [PackagesComponent],
})
export class PackagesModule {}
