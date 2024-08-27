import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/components/header/header.module';
import { FooterModule } from './shared/components/footer/footer.module';
import { LoginModule } from './login/login.module';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { WelcomeModule } from './welcome/welcome.module';
import { PackagesModule } from './packages/packages.module';
import { FullScreenWizardNewPackageModule } from './packages/components/full-screen-wizard/full-screen-wizard-new-package.module';
import { FullEditScreenWizardModule } from './packages/components/full-edit-screen-wizard/full-edit-screen-wizard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    NgrxStoreModule.forRoot({
      routerReducer: routerReducer,
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    HeaderModule,
    FooterModule,
    LoginModule,
    WelcomeModule,
    PackagesModule,
    FullScreenWizardNewPackageModule,
    FullEditScreenWizardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
