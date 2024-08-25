import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PACKAGE_FEATURE_KEY } from '../states/package.state';
import { PackageState } from '../../package.model';

export const selectPackageState =
  createFeatureSelector<PackageState>(PACKAGE_FEATURE_KEY);

export const selectIsLoading = createSelector(
  selectPackageState,
  (state: PackageState) => state.isLoading
);

export const selectPackages = createSelector(
  selectPackageState,
  (state: PackageState) => state.packages
);
