import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LANDING_FEATURE_KEY } from '../states/landing.state';
import { LandingState } from '../../landing.model';

export const selectLandingState =
  createFeatureSelector<LandingState>(LANDING_FEATURE_KEY);

export const selectIsLoading = createSelector(
  selectLandingState,
  (state: LandingState) => state.isLoading
);

export const selectFullPackages = createSelector(
  selectLandingState,
  (state: LandingState) => state.packages
);

export const selectCitiesWithCountOfPackages = createSelector(
  selectLandingState,
  (state: LandingState) => state
);

export const selectReviewers = createSelector(
  selectLandingState,
  (state: LandingState) => state
);

export const selectFullPackageById = createSelector(
  selectLandingState,
  (state: LandingState) => state
);
