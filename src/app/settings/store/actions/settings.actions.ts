import { createAction, props } from '@ngrx/store';

const actor = '[Settings]';

export const getCountries = createAction(`${actor} Get Countries`);

export const getCountriesSuccess = createAction(
  `${actor} Get Countries Success`,
  props<{ countriesResponse: any }>()
);

export const getCountriesFailure = createAction(
  `${actor} Get Countries Failure`,
  props<{ errorResponse: any }>()
);

export const getCities = createAction(`${actor} Get Cities`);

export const getCitiesSuccess = createAction(
  `${actor} Get Cities Success`,
  props<{ citiesResponse: any }>()
);

export const getCitiesFailure = createAction(
  `${actor} Get Cities Failure`,
  props<{ errorResponse: any }>()
);

export const getTransports = createAction(`${actor} Get Transports`);

export const getTransportsSuccess = createAction(
  `${actor} Get Transports Success`,
  props<{ transportsResponse: any }>()
);

export const getTransportsFailure = createAction(
  `${actor} Get Transports Failure`,
  props<{ errorResponse: any }>()
);

export const getHostings = createAction(`${actor} Get Hostings`);

export const getHostingsSuccess = createAction(
  `${actor} Get Hostings Success`,
  props<{ hostingsResponse: any }>()
);

export const getHostingsFailure = createAction(
  `${actor} Get Hostings Failure`,
  props<{ errorResponse: any }>()
);

export const addCountry = createAction(
  `${actor} Add Country`,
  props<{ country: any }>()
);

export const addCountrySuccess = createAction(
  `${actor} Add Country Success`,
  props<{ countryResponse: any }>()
);

export const addCountryFailure = createAction(
  `${actor} Add Country Failure`,
  props<{ errorResponse: any }>()
);

export const addCity = createAction(
  `${actor} Add City`,
  props<{ city: any }>()
);

export const addCitySuccess = createAction(
  `${actor} Add City Success`,
  props<{ cityResponse: any }>()
);

export const addCityFailure = createAction(
  `${actor} Add City Failure`,
  props<{ errorResponse: any }>()
);

export const addTransport = createAction(
  `${actor} Add Transport`,
  props<{ transport: any }>()
);

export const addTransportSuccess = createAction(
  `${actor} Add Transport Success`,
  props<{ transportResponse: any }>()
);

export const addTransportFailure = createAction(
  `${actor} Add Transport Failure`,
  props<{ errorResponse: any }>()
);

export const addHosting = createAction(
  `${actor} Add Hosting`,
  props<{ hosting: any }>()
);

export const addHostingSuccess = createAction(
  `${actor} Add Hosting Success`,
  props<{ hostingResponse: any }>()
);

export const addHostingFailure = createAction(
  `${actor} Add Hosting Failure`,
  props<{ errorResponse: any }>()
);
