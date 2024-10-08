import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { LandingActions } from '../landing/store/actions';
import { BookingModel } from '../landing/landing.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css',
})
export class PaymentStatusComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;

  public selectPackage$ = this.store.select(fromLanding.selectLandingState);
  public isLoading = false;
  public booking: any = {};
  public bookingPaid = false;

  public isProcessing = false;

  public barCodeValue = '';

  faCheckCircle = faCheckCircle;
  faCalendarAlt = faCalendarAlt;
  faCar = faCar;
  faHotel = faHotel;
  faCommentDots = faCommentDots;
  faTicket = faTicket;
  faPlane = faPlane;
  faTimesCircle = faTimesCircle;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const id = params.get('id');
      this.barCodeValue = `latinos-${id} `;
      this.store.dispatch(
        LandingActions.getBookingById({
          bookingID: id ? parseInt(id, 10) : 0,
        })
      );
    });

    this.selectPackage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((thePackage) => {
        this.isLoading = !thePackage.isLoading;
        this.booking = thePackage.booking
          ? (thePackage.booking as unknown as BookingModel[])
          : [];
        this.bookingPaid = this.booking[0].bookPaid;
        this.isProcessing = true;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  goToPackage(id: number): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['paquete', id])
    );
    window.open(url, '_blank');
  }

  public generatePDF(): void {
    const data = this.content.nativeElement;
    html2canvas(data).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('payment-status.pdf');
    });
  }
}
