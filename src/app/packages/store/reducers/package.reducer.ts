import { Action, createReducer, on } from '@ngrx/store';
import { createRehydrateReducer } from '../../../shared/utils/rehydrate-reducer';
import {
  initialPackageState,
  PACKAGE_FEATURE_KEY,
} from '../states/package.state';
import { PackageActions } from '../actions';
import { PackageState } from '../../package.model';

export const PackageReducer = createRehydrateReducer(
  { key: PACKAGE_FEATURE_KEY },
  initialPackageState,
  on(
    PackageActions.newPackage,
    (state: PackageState, { packageEntity }: any) => {
      return {
        ...state,
        ...packageEntity,
        isLoading: true,
      };
    }
  ),
  on(
    PackageActions.newPackageSuccess,
    (state: PackageState, { packageResponse }: any) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    PackageActions.newPackageFailure,
    (state: PackageState, { errorResponse }: any) => {
      return {
        ...state,
        ...initialPackageState,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(PackageActions.getPackages, (state: PackageState, { userId }: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    PackageActions.getPackagesSuccess,
    (state: PackageState, { packagesResponse }: any) => {
      return {
        ...state,
        packages: packagesResponse,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    PackageActions.getPackagesFailure,
    (state: PackageState, { errorResponse }: any) => {
      return {
        ...state,
        ...initialPackageState,
        isLoading: false,
        isError: true,
      };
    }
  )
);
