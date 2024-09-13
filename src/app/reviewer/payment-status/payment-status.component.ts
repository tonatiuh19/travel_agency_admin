import { Component, OnInit } from '@angular/core';
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
import { Subject, take, takeUntil } from 'rxjs';
import { fromLanding } from '../landing/store/selectors';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { LandingActions } from '../landing/store/actions';
import { BookingModel } from '../landing/landing.model';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css',
})
export class PaymentStatusComponent implements OnInit {
  public selectPackage$ = this.store.select(fromLanding.selectLandingState);
  public isLoading = false;
  public booking: any = {};
  public bookingPaid = false;

  faCheckCircle = faCheckCircle;
  faCalendarAlt = faCalendarAlt;
  faCar = faCar;
  faHotel = faHotel;
  faCommentDots = faCommentDots;
  faTicket = faTicket;
  faPlane = faPlane;
  faTimesCircle = faTimesCircle;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const id = params.get('id');
      this.store.dispatch(
        LandingActions.getBookingById({
          bookingID: id ? parseInt(id, 10) : 0,
        })
      );
    });

    this.selectPackage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((thePackage) => {
        console.log(thePackage);
        this.isLoading = !thePackage.isLoading;
        this.booking = thePackage.booking
          ? (thePackage.booking as unknown as BookingModel[])
          : [];
        this.bookingPaid = this.booking[0].bookPaid;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
