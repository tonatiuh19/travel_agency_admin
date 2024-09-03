import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterReviewerComponent } from './footer-reviewer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FooterReviewerComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FooterReviewerComponent],
})
export class FooterReviewerModule {}
