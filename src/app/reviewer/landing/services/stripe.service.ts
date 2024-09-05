import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(
      'pk_test_51PvXJtDK4RXtwLNrx1z95GxQE6xBie6KlpCThH3Oe5VxpmdXAtE7saAkJCqImbd4x9kZjffuiQHkgFLXEH4p3grS00rRUEjupx'
    );
  }

  async getStripe() {
    return await this.stripePromise;
  }
}
