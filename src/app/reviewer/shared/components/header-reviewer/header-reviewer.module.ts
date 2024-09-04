import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderReviewerComponent } from './header-reviewer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [HeaderReviewerComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      domain: 'dev-vnyn7tqt4imnz526.us.auth0.com',
      clientId: 'ujhLWNhnuJu98tT1Ua1LTpCB4nKRhRo4',
      authorizationParams: {
        redirect_uri: window.location.origin,
        ui_locales: 'es',
      },
    }),
  ],
  exports: [HeaderReviewerComponent],
})
export class HeaderReviewerModule {}
