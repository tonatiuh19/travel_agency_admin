import { Component, Input } from '@angular/core';
import { PackageModel } from '../../../landing/landing.model';
import {
  faCalendar,
  faMapMarkerAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-image-card',
  templateUrl: './package-image-card.component.html',
  styleUrl: './package-image-card.component.css',
})
export class PackageImageCardComponent {
  @Input() package!: PackageModel;

  faCalendar = faCalendar;
  faMapMarkerAlt = faMapMarkerAlt;
  faUsers = faUsers;

  constructor(private router: Router) {}

  calculateDaysBetweenDates(dateRange: string): number {
    // Split the date range string into start and end dates
    const [startDate, endDate] = dateRange.split(' - ');

    // Parse the date strings into Date objects
    const startParts = startDate.split('-');
    const endParts = endDate.split('-');

    const start = new Date(
      parseInt(startParts[2], 10),
      parseInt(startParts[1], 10) - 1,
      parseInt(startParts[0], 10)
    );
    const end = new Date(
      parseInt(endParts[2], 10),
      parseInt(endParts[1], 10) - 1,
      parseInt(endParts[0], 10)
    );

    // Calculate the difference in time
    const diffTime = Math.abs(end.getTime() - start.getTime());

    // Convert the difference in time to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If the dates are the same, return 1
    return diffDays === 0 ? 1 : diffDays;
  }

  goToPackage(id: number): void {
    this.router.navigate(['paquete', id]);
  }
}
