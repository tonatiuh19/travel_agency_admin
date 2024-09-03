import { Component } from '@angular/core';
import {
  faCalendar,
  faCalendarAlt,
  faSubway,
  faHome,
  faLock,
  faCheckCircle,
  faStar,
  faStarHalfAlt,
  faShareSquare,
  faCar,
  faHotel,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.css',
})
export class PackageComponent {
  faCalendar = faCalendar;
  faCalendarAlt = faCalendarAlt;
  faSubway = faSubway;
  faHome = faHome;
  faLock = faLock;
  faCheckCircle = faCheckCircle;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faShareSquare = faShareSquare;
  faCar = faCar;
  faHotel = faHotel;
  faCommentDots = faCommentDots;
}
