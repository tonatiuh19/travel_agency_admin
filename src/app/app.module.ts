import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { FullScreenWizardModule } from './shared/components/full-screen-wizard/full-screen-wizard.module';
import { FullScreenWizardNewPackageModule } from './packages/components/full-screen-wizard/full-screen-wizard-new-package.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
