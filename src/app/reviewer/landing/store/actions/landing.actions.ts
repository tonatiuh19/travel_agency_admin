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

export const getFullPackageById = createAction(
  `${actor} Get Package By Id`,
  props<{ packID: number }>()
);

export const getFullPackageByIdSuccess = createAction(
  `${actor} Get Package By Id Success`,
  props<{ packageByIdResponse: any }>()
);

export const getFullPackageByIdFailure = createAction(
  `${actor} Get Package By Id Failure`,
  props<{ errorResponse: any }>()
);

export const authenticateUser = createAction(
  `${actor} Authenticate User`,
  props<{ user: any }>()
);

export const authenticateUserSuccess = createAction(
  `${actor} Authenticate User Success`,
  props<{ user: any }>()
);

export const authenticateUserFailure = createAction(
  `${actor} Authenticate User Failure`,
  props<{ errorResponse: any }>()
);

export const logoutUser = createAction(`${actor} Logout User`);

export const paying = createAction(
  `${actor} Paying`,
  props<{ paymentData: any }>()
);

export const payingSuccess = createAction(
  `${actor} Paying Success`,
  props<{ paymentResponse: any }>()
);

export const cleanPayment = createAction(`${actor} Clean Payment`);

export const payingFailure = createAction(
  `${actor} Paying Failure`,
  props<{ errorResponse: any }>()
);

export const getBookingById = createAction(
  `${actor} Get Booking By Id`,
  props<{ bookingID: number }>()
);

export const getBookingByIdSuccess = createAction(
  `${actor} Get Booking By Id Success`,
  props<{ bookingResponse: any }>()
);

export const getBookingByIdFailure = createAction(
  `${actor} Get Booking By Id Failure`,
  props<{ errorResponse: any }>()
);

export const getBookingsByUserId = createAction(
  `${actor} Get Bookings By User Id`,
  props<{ custID: number }>()
);

export const getBookingsByUserIdSuccess = createAction(
  `${actor} Get Bookings By User Id Success`,
  props<{ bookingsResponse: any }>()
);

export const getBookingsByUserIdFailure = createAction(
  `${actor} Get Bookings By User Id Failure`,
  props<{ errorResponse: any }>()
);
