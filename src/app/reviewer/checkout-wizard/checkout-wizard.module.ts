import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutWizardComponent } from './checkout-wizard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingReviewerMaskModule } from '../shared/components/loading-reviewer-mask/loading-reviewer-mask.module';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [CheckoutWizardComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    LoadingReviewerMaskModule,
    AuthModule.forRoot({
      domain: 'dev-vnyn7tqt4imnz526.us.auth0.com',
      clientId: 'ujhLWNhnuJu98tT1Ua1LTpCB4nKRhRo4',
      authorizationParams: {
        redirect_uri: window.location.origin,
        ui_locales: 'es',
      },
    }),
  ],
  exports: [CheckoutWizardComponent],
})
export class CheckoutWizardModule {}
