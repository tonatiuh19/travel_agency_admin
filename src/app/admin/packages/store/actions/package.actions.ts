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

export const deletePackage = createAction(
  `${actor} Delete Package`,
  props<{ id: string }>()
);

export const deletePackageSuccess = createAction(
  `${actor} Delete Package Success`,
  props<{ deletePackageResponse: any }>()
);

export const deletePackageFailure = createAction(
  `${actor} Delete Package Failure`,
  props<{ errorResponse: any }>()
);

export const getPackageById = createAction(
  `${actor} Get Package By Id`,
  props<{ userId: string; packID: number }>()
);

export const getPackageByIdSuccess = createAction(
  `${actor} Get Package By Id Success`,
  props<{ packageByIdResponse: any }>()
);

export const getPackageByIdFailure = createAction(
  `${actor} Get Package By Id Failure`,
  props<{ errorResponse: any }>()
);

export const updatePackage = createAction(
  `${actor} Update Package`,
  props<{ packageEntity: any }>()
);

export const updatePackageSuccess = createAction(
  `${actor} Update Package Success`,
  props<{ updatePackageResponse: any }>()
);

export const updatePackageFailure = createAction(
  `${actor} Update Package Failure`,
  props<{ errorResponse: any }>()
);

export const getCityById = createAction(
  `${actor} Get City By Id`,
  props<{ citID: number }>()
);

export const getCityByIdSuccess = createAction(
  `${actor} Get City By Id Success`,
  props<{ cityByIdResponse: any }>()
);

export const getCityByIdFailure = createAction(
  `${actor} Get City By Id Failure`,
  props<{ errorResponse: any }>()
);
