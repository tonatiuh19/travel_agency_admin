import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginStoreModule } from './store/login.store.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from '../shared/components/loading/loading/loading.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoginStoreModule,
    ReactiveFormsModule,
    LoadingModule,
    FontAwesomeModule,
    HeaderModule,
    FooterModule,
  ],
})
export class LoginModule {}
