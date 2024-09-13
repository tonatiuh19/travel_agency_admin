import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-checkout-wizard',
  templateUrl: './checkout-wizard.component.html',
  styleUrl: './checkout-wizard.component.css',
})
export class CheckoutWizardComponent implements OnInit {
  public selectUser$ = this.store.select(fromLanding.selectUser);
  public selectPackage$ = this.store.select(fromLanding.selectFullPackageById);
  public isLoading = false;
  public isLoadingCheckout = false;

  public package: FullPackageModel[] = [];
  public user: any = {};
  public booking: any = {};
  public isLogged = false;
  public pricePackage = 0;

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

  private unsubscribe$ = new Subject<void>();

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private card: StripeCardElement | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public auth: AuthService,
    private router: Router,
    private stripeService: StripeService,
    private fb: FormBuilder
  ) {
    this.passengerForm = this.fb.group({
      numPassengers: ['', Validators.required],
      passengers: this.fb.array([]),
      contactName: ['', Validators.required],
      contactSurname: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
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
        console.log('Package by ID:', packageById);
        this.isLoading = !packageById.isLoading;
        this.package = packageById.package
          ? (packageById.package as unknown as FullPackageModel[])
          : [];
        this.pricePackage = this.package[0].packPrice;

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

    this.onNumPassengersChange();
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
    }
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
    this.isLoadingCheckout = true;
    if (!this.stripe || !this.card) {
      console.error('Stripe.js has not loaded yet');
      return;
    }

    const { token, error } = await this.stripe.createToken(this.card);

    this.booking = {
      ...this.passengerForm.value,
      packID: this.package[0].packID,
      packPrice: this.pricePackage,
      bookCustomerID: this.user.custID,
      custStripeID: this.user.custStripeID,
    };

    if (this.passengerForm.valid) {
      console.log(this.passengerForm.value);
      if (error) {
        console.error(error);
        this.isLoadingCheckout = false;
        this.isStripeError = true;
        this.stripeErrorMessage = error.message || '';
      } else {
        this.store.dispatch(
          LandingActions.paying({
            paymentData: {
              ...this.booking,
              token: token.id,
            },
          })
        );
        // Send the token to your server for processing the payment
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
    this.pricePackage = this.package[0].packPrice * passengers;
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
