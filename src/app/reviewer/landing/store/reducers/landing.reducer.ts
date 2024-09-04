import { Action, createReducer, on } from '@ngrx/store';
import { createRehydrateReducer } from '../../../../admin/shared/utils/rehydrate-reducer';
import {
  initialLandingState,
  LANDING_FEATURE_KEY,
} from '../states/landing.state';
import { LandingActions } from '../actions';
import { LandingState } from '../../landing.model';

export const LandingReducer = createRehydrateReducer(
  { key: LANDING_FEATURE_KEY },
  initialLandingState,

  on(LandingActions.getFullPackages, (state: LandingState, { userId }: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.getFullPackagesSuccess,
    (state: LandingState, { packagesResponse }: any) => {
      return {
        ...state,
        packages: packagesResponse,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.getFullPackagesFailure,
    (state: LandingState, { errorResponse }: any) => {
      return {
        ...state,
        ...initialLandingState,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(
    LandingActions.getCitiesWithCountOfPackages,
    (state: LandingState, { userId }: any) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    LandingActions.getCitiesWithCountOfPackagesSuccess,
    (state: LandingState, { citiesResponse }: any) => {
      return {
        ...state,
        cities: citiesResponse,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.getCitiesWithCountOfPackagesFailure,
    (state: LandingState, { errorResponse }: any) => {
      return {
        ...state,
        ...initialLandingState,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.getReviews, (state: LandingState, { userId }: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.getReviewsSuccess,
    (state: LandingState, { reviewsResponse }: any) => {
      return {
        ...state,
        reviews: reviewsResponse,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.getReviewsFailure,
    (state: LandingState, { errorResponse }: any) => {
      return {
        ...state,
        ...initialLandingState,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(
    LandingActions.getFullPackageById,
    (state: LandingState, { packID }: any) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    LandingActions.getFullPackageByIdSuccess,
    (state: LandingState, { packageByIdResponse }: any) => {
      return {
        ...state,
        package: packageByIdResponse,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.getFullPackageByIdFailure,
    (state: LandingState, { errorResponse }: any) => {
      return {
        ...state,
        ...initialLandingState,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.authenticateUser, (state: LandingState, { user }: any) => {
    return {
      ...state,
      user: user,
      isLoading: true,
    };
  }),
  on(
    LandingActions.authenticateUserSuccess,
    (state: LandingState, { user }: any) => {
      return {
        ...state,
        user: user,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.authenticateUserFailure,
    (state: LandingState, { errorResponse }: any) => {
      return {
        ...state,
        ...initialLandingState,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.logoutUser, (state: LandingState) => {
    return {
      ...state,
      user: {
        custID: '',
        custEmail: '',
        custEmailVerified: '',
        custName: '',
        custSurname: '',
        picture: '',
      },
    };
  })
);
