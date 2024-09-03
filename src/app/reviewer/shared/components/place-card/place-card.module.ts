import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceCardComponent } from './place-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PlaceCardComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [PlaceCardComponent],
})
export class PlaceCardModule {}
