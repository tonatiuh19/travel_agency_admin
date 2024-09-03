import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewerComponent } from './reviewer.component';
import { LandingModule } from './landing/landing.module';

@NgModule({
  declarations: [ReviewerComponent],
  imports: [CommonModule, LandingModule],
  exports: [ReviewerComponent],
})
export class ReviewerModule {}
