import { Component, OnInit } from '@angular/core';
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

  public package: FullPackageModel[] = [];
  public user: any = {};
  public isLogged = false;
  public pricePackage = 0;

  public passengerForm: FormGroup;

  faCalendarAlt = faCalendarAlt;
  faCheckCircle = faCheckCircle;
  faLock = faLock;
  faKey = faKey;
  faExclamationTriangle = faExclamationTriangle;

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
      terms: [false, Validators.requiredTrue],
    });
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const id = params.get('id');
      this.store.dispatch(
        LandingActions.getFullPackageById({
          packID: id ? parseInt(id, 10) : 0,
        })
      );
    });

    this.auth.user$.subscribe((profile) => {
      if (profile) {
        this.store.dispatch(
          LandingActions.authenticateUser({
            user: profile,
          })
        );
      }
    });

    this.selectUser$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.user = user;
      this.isLogged = !!(user && this.user.custID !== '');
    });

    this.selectPackage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((packageById) => {
        this.isLoading = !packageById.isLoading;
        this.package = packageById.package
          ? (packageById.package as unknown as FullPackageModel[])
          : [];
        this.pricePackage = this.package[0].packPrice;
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

    if (this.passengerForm.valid) {
      console.log(this.passengerForm.value);
    } else {
      this.passengerForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }

    if (error) {
      console.error(error);
    } else {
      console.log('Token:', token);
      // Send the token to your server for processing the payment
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
