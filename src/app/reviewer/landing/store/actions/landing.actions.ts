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

export const getCitiesWithCountOfPackages = createAction(
  `${actor} Get Cities With Count Of Packages`
);

export const getCitiesWithCountOfPackagesSuccess = createAction(
  `${actor} Get Cities With Count Of Packages Success`,
  props<{ citiesResponse: any }>()
);

export const getCitiesWithCountOfPackagesFailure = createAction(
  `${actor} Get Cities With Count Of Packages Failure`,
  props<{ errorResponse: any }>()
);

export const getReviews = createAction(`${actor} Get Reviews`);

export const getReviewsSuccess = createAction(
  `${actor} Get Reviews Success`,
  props<{ reviewsResponse: any }>()
);

export const getReviewsFailure = createAction(
  `${actor} Get Reviews Failure`,
  props<{ errorResponse: any }>()
);
