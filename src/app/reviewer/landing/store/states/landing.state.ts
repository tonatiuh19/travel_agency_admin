import { LandingState } from '../../landing.model';

export const LANDING_FEATURE_KEY = 'landing';

export const initialLandingState: LandingState = {
  packages: [],
  booking: [],
  payment: {
    bookingID: 0,
    message: '',
    paymentSuccess: false,
    errorCode: '',
  },
  user: {
    custID: '',
    custEmail: '',
    custEmailVerified: '',
    custName: '',
    custSurname: '',
    picture: '',
    custStripeID: '',
  },
  isLoading: false,
  isError: false,
};
