import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
