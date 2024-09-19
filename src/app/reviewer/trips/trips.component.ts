import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { fromLanding } from '../landing/store/selectors';
import { LandingActions } from '../landing/store/actions';
import { BookingModel } from '../landing/landing.model';
import {
  faCalendarAlt,
  faCheckCircle,
  faCar,
  faHotel,
  faCommentDots,
  faTicket,
  faPlane,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent implements OnInit {
  public selectUser$ = this.store.select(fromLanding.selectUser);
  public selectPackage$ = this.store.select(fromLanding.selectLandingState);
  public isLoading = false;

  public packages: BookingModel[] = [];
  faCar = faCar;
  faHotel = faHotel;
  faCommentDots = faCommentDots;
  faCalendarAlt = faCalendarAlt;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectUser$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.store.dispatch(
        LandingActions.getBookingsByUserId({
          custID: user?.custID ? Number(user.custID) : 0,
        })
      );
    });

    this.selectPackage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((thePackages) => {
        this.isLoading = !thePackages.isLoading;
        this.packages = thePackages.bookings
          ? (thePackages.bookings as unknown as BookingModel[])
          : [];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCardClick(tripId: number): void {
    this.router.navigate(['tuexperiencia', tripId]);
  }

  transformDateToSpanish(dateString: string): string {
    const date = new Date(dateString);

    const daysOfWeek = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const monthsOfYear = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${dayOfWeek}, ${day} de ${month}, ${year}, ${hours}:${minutes}`;
  }
}
