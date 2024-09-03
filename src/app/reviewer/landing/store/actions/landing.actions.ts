import { createAction, props } from '@ngrx/store';

const actor = '[Landing]';

export const getFullPackages = createAction(`${actor} Get Packages`);

export const getFullPackagesSuccess = createAction(
  `${actor} Get Packages Success`,
  props<{ packagesResponse: any }>()
);

export const getFullPackagesFailure = createAction(
  `${actor} Get Packages Failure`,
  props<{ errorResponse: any }>()
);
