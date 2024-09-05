import { LandingState } from '../../landing.model';

export const LANDING_FEATURE_KEY = 'landing';

export const initialLandingState: LandingState = {
  packages: [],
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
