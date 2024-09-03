import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderReviewerComponent } from './header-reviewer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HeaderReviewerComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [HeaderReviewerComponent],
})
export class HeaderReviewerModule {}
