import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageImageCardComponent } from './package-image-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PackageImageCardComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [PackageImageCardComponent],
})
export class PackageImageCardModule {}
