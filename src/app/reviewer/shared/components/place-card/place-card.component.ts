import { Component, Input } from '@angular/core';
import { CitiesWithCountOfPackagesModel } from '../../../landing/landing.model';
import { faGift } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.css',
})
export class PlaceCardComponent {
  @Input() place!: CitiesWithCountOfPackagesModel;

  faGift = faGift;
}
