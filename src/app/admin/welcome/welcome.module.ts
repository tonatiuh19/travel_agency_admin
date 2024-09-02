import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { FooterModule } from '../shared/components/footer/footer.module';
import { HeaderModule } from '../shared/components/header/header.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, FooterModule, HeaderModule],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
