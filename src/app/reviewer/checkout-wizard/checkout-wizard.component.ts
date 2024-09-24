import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { fromLanding } from '../landing/store/selectors';
import { Router } from '@angular/router';
import {
  faCalendarAlt,
  faCheckCircle,
  faLock,
  faKey,
  faExclamationTriangle,
  faUserCheck,
  faIdCardAlt,
  faGlobeAmericas,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { FullPackageModel } from '../landing/landing.model';
import { LandingActions } from '../landing/store/actions';
import { AuthService } from '@auth0/auth0-angular';
import { StripeService } from '../landing/services/stripe.service';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getTodayDate } from '../../admin/shared/utils/get-date';

@Component({
  selector: 'app-checkout-wizard',
  templateUrl: './checkout-wizard.component.html',
  styleUrl: './checkout-wizard.component.css',
})
export class CheckoutWizardComponent implements OnInit {
  @ViewChild('paymentButton') paymentButton!: ElementRef;

  public selectUser$ = this.store.select(fromLanding.selectUser);
  public selectPackage$ = this.store.select(fromLanding.selectFullPackageById);
  public isLoading = false;
  public isLoadingCheckout = false;

  public package: any = {};
  public user: any = {};
  public booking: any = {};
  public isLogged = false;

  public pricePackageForm = 0;
  public pricePackage = 0;
  public pricePackageMax = 0;

  public passengerForm: FormGroup;

  public isStripeError = false;
  public stripeErrorMessage = '';

  public isPaymentError = false;

  faCalendarAlt = faCalendarAlt;
  faCheckCircle = faCheckCircle;
  faLock = faLock;
  faKey = faKey;
  faExclamationTriangle = faExclamationTriangle;
  faUserCheck = faUserCheck;
  faIdCardAlt = faIdCardAlt;
  faGlobeAmericas = faGlobeAmericas;
  faCircleNotch = faCircleNotch;

  todayDate!: Date;

  private unsubscribe$ = new Subject<void>();

  private initialViewportHeight!: number;

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private card: StripeCardElement | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public auth: AuthService,
    private router: Router,
    private stripeService: StripeService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.passengerForm = this.fb.group({
      numPassengers: ['', Validators.required],
      passengers: this.fb.array([]),
      contactName: ['', Validators.required],
      contactSurname: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      bookingDate: ['', Validators.required],
    });
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.selectUser$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.user = user;
      this.user.custName
        ? this.passengerForm.get('contactName')?.setValue(this.user.custName)
        : this.passengerForm.get('contactName')?.setValue('');
      this.user.custSurname
        ? this.passengerForm
            .get('contactSurname')
            ?.setValue(this.user.custSurname)
        : this.passengerForm.get('contactSurname')?.setValue('');
      this.user.custEmail
        ? this.passengerForm.get('contactEmail')?.setValue(this.user.custEmail)
        : this.passengerForm.get('contactEmail')?.setValue('');
      this.isLogged = !!(user && this.user.custID !== '');
    });

    this.selectPackage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((packageById) => {
        this.isLoading = !packageById.isLoading;

        this.package = packageById.package;

        this.pricePackage = this.package.packPrice;
        this.pricePackageMax = this.package.packPriceMax;

        if (
          !packageById.payment?.paymentSuccess &&
          packageById.payment?.message !== ''
        ) {
          this.isPaymentError = true;
          this.isLoadingCheckout = false;
        } else if (
          packageById.payment?.paymentSuccess &&
          packageById.payment?.bookingID !== 0
        ) {
          this.isPaymentError = false;
          this.isLoadingCheckout = false;
          this.router.navigate([
            'tuexperiencia',
            packageById.payment?.bookingID,
          ]);
        }
      });

    this.initialViewportHeight = window.innerHeight;
    this.onNumPassengersChange();
    this.addViewportResizeListener();
  }

  ngAfterViewInit(): void {
    if (this.isLogged) {
      this.setupStripe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(LandingActions.cleanPayment());
    this.removeViewportResizeListener();
  }

  get passengers(): FormArray {
    return this.passengerForm.get('passengers') as FormArray;
  }

  onNumPassengersChange(): void {
    this.passengerForm.get('numPassengers')?.valueChanges.subscribe((num) => {
      this.updatePrice(num);
      this.updatePassengerInputs(num);
    });
  }

  updatePassengerInputs(num: number): void {
    while (this.passengers.length !== 0) {
      this.passengers.removeAt(0);
    }
    for (let i = 0; i < num; i++) {
      this.passengers.push(
        this.fb.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          edad: ['', [Validators.required, Validators.min(0)]],
        })
      );
    }
    if (this.passengers.length > 0) {
      this.passengers.controls[0].get('nombre')?.setValue(this.user.custName);
      this.passengers.controls[0]
        .get('apellido')
        ?.setValue(this.user.custSurname);

      this.setPricePackage(this.passengers.length);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const viewportHeight = window.innerHeight;
    const container = document.querySelector('.fixed-bottom');
    if (viewportHeight < this.initialViewportHeight * 0.7) {
      // Keyboard is likely open
      if (container) {
        this.renderer.setStyle(container, 'display', 'none');
      }
    } else {
      // Keyboard is likely closed
      if (container) {
        this.renderer.setStyle(container, 'display', 'block');
      }
    }
  }

  addViewportResizeListener(): void {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  removeViewportResizeListener(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  async setupStripe() {
    const style = {
      base: {
        color: '#32325d',
        fontSmoothing: 'antialiased',
        fontSize: '18px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#dc3545',
        iconColor: '#dc3545',
      },
    };
    this.stripe = await this.stripeService.getStripe();
    if (this.stripe) {
      this.elements = this.stripe.elements({
        locale: 'es', // Set the locale to Spanish
      });
      this.card = this.elements.create('card', { style });
      //this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async handlePayment() {
    if (!this.stripe || !this.card) {
      console.error('Stripe.js has not loaded yet');
      return;
    }

    const { token, error } = await this.stripe.createToken(this.card);

    this.booking = {
      ...this.passengerForm.value,
      packID: this.package.packID,
      packPrice: this.pricePackageForm,
      packTitle: this.package.packTitle,
      bookCustomerID: this.user.custID,
      custStripeID: this.user.custStripeID,
    };

    if (this.passengerForm.valid) {
      const transformedDate = this.transformDate(
        this.passengerForm.value.bookingDate
      );
      this.passengerForm.get('bookingDate')?.setValue(transformedDate);

      if (error) {
        this.isLoadingCheckout = false;
        this.isStripeError = true;
        this.stripeErrorMessage = error.message || '';
      } else {
        this.isLoadingCheckout = true;
        this.isStripeError = false;
        this.store.dispatch(
          LandingActions.paying({
            paymentData: {
              ...this.booking,
              token: token.id,
            },
          })
        );
      }
    } else {
      this.isLoadingCheckout = false;
      this.passengerForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  login(): void {
    const urlSegment = this.router.url.split('/').slice(1).join('/');

    this.auth.loginWithRedirect({
      appState: { target: urlSegment },
    });
  }

  updatePrice(passengers: number): void {
    this.pricePackage = this.package.packPrice * passengers;
  }

  transformDate(dateString: string): string {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

  setPricePackage(passengers: number): void {
    const vehicleInfo = this.calculateVehicles(passengers);
    /*console.log('Cars for four:', vehicleInfo.carsForFour);
    console.log('Cars for six:', vehicleInfo.carsForSix);
    console.log('Total cost:', vehicleInfo.totalCost);*/
    this.pricePackageForm = vehicleInfo.totalCost;
  }

  calculateVehicles(passengers: number): {
    carsForFour: number;
    carsForSix: number;
    totalCost: number;
  } {
    const costForFour = 550;
    const costForSix = 650;

    let carsForFour = 0;
    let carsForSix = 0;
    let remainingPassengers = passengers;

    // Special case: if there are 5 passengers, it's cheaper to use one car for six people
    if (remainingPassengers === 5) {
      carsForSix = 1;
      remainingPassengers = 0;
    } else {
      // Use cars for six people first to minimize the number of vehicles
      carsForSix = Math.floor(remainingPassengers / 6);
      remainingPassengers %= 6;

      // Use cars for four people for the remaining passengers
      if (remainingPassengers > 0) {
        carsForFour = Math.ceil(remainingPassengers / 4);
      }
    }

    const totalCost = carsForFour * costForFour + carsForSix * costForSix;

    return { carsForFour, carsForSix, totalCost };
  }

  triggerPayment(): void {
    if (this.paymentButton) {
      this.paymentButton.nativeElement.click();
    }
  }

  public extractFirstDate(dateRange: string): string {
    const parts = dateRange.split(' ');
    const firstDatePart = parts[0].trim();
    return firstDatePart;
  }

  public extractSecondDate(dateRange: string): string {
    const parts = dateRange.split(' ');
    const dateAfterSecondSpace = parts[2].trim();
    return dateAfterSecondSpace;
  }
}
