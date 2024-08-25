import { createAction, props } from '@ngrx/store';

const actor = '[Package]';

export const newPackage = createAction(
  `${actor} New Package`,
  props<{ packageEntity: any }>()
);

export const newPackageSuccess = createAction(
  `${actor} New Package Success`,
  props<{ newPackageResponse: any }>()
);

export const newPackageFailure = createAction(
  `${actor} newPackage Failure`,
  props<{ errorResponse: any }>()
);

export const getPackages = createAction(
  `${actor} Get Packages`,
  props<{ userId: string }>()
);

export const getPackagesSuccess = createAction(
  `${actor} Get Packages Success`,
  props<{ packagesResponse: any }>()
);

export const getPackagesFailure = createAction(
  `${actor} Get Packages Failure`,
  props<{ errorResponse: any }>()
);
