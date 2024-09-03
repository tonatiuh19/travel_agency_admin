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
  )
);
