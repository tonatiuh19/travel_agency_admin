import { Action, createReducer, on } from '@ngrx/store';
import { createRehydrateReducer } from '../../../shared/utils/rehydrate-reducer';
import {
  initialSettingsState,
  SETTINGS_FEATURE_KEY,
} from '../states/settings.state';
import { SettingsState } from '../../settings.model';
import { SettingsActions } from '../actions';

export const SettingsReducer = createRehydrateReducer(
  { key: SETTINGS_FEATURE_KEY },
  initialSettingsState,
  on(SettingsActions.getCountries, (state: SettingsState) => ({
    ...state,
    countries: [],
    isLoading: true,
  })),
  on(
    SettingsActions.getCountriesSuccess,
    (state: SettingsState, { countriesResponse }) => ({
      ...state,
      countries: countriesResponse,
      isLoading: false,
      isError: false,
    })
  ),
  on(SettingsActions.getCountriesFailure, (state: SettingsState) => ({
    ...state,
    countries: [],
    isLoading: false,
    isError: true,
  })),
  on(SettingsActions.getCities, (state: SettingsState) => ({
    ...state,
    cities: [],
    isLoading: true,
  })),
  on(
    SettingsActions.getCitiesSuccess,
    (state: SettingsState, { citiesResponse }) => ({
      ...state,
      cities: citiesResponse,
      isLoading: false,
      isError: false,
    })
  ),
  on(SettingsActions.getCitiesFailure, (state: SettingsState) => ({
    ...state,
    cities: [],
    isLoading: false,
    isError: true,
  })),
  on(SettingsActions.getTransports, (state: SettingsState) => ({
    ...state,
    transports: [],
    isLoading: true,
  })),
  on(
    SettingsActions.getTransportsSuccess,
    (state: SettingsState, { transportsResponse }) => ({
      ...state,
      transports: transportsResponse,
      isLoading: false,
      isError: false,
    })
  ),
  on(SettingsActions.getTransportsFailure, (state: SettingsState) => ({
    ...state,
    transports: [],
    isLoading: false,
    isError: true,
  })),
  on(SettingsActions.getHostings, (state: SettingsState) => ({
    ...state,
    hostings: [],
    isLoading: true,
  })),
  on(
    SettingsActions.getHostingsSuccess,
    (state: SettingsState, { hostingsResponse }) => ({
      ...state,
      hostings: hostingsResponse,
      isLoading: false,
      isError: false,
    })
  ),
  on(SettingsActions.getHostingsFailure, (state: SettingsState) => ({
    ...state,
    hostings: [],
    isLoading: false,
    isError: true,
  })),
  on(SettingsActions.addCountry, (state: SettingsState) => ({
    ...state,
    isLoading: true,
  })),
  on(
    SettingsActions.addCountrySuccess,
    (state: SettingsState, { countryResponse }) => ({
      ...state,
      countries: [...state.countries, countryResponse],
      isLoading: false,
      isError: false,
    })
  ),
  on(SettingsActions.addCountryFailure, (state: SettingsState) => ({
    ...state,
    isLoading: false,
    isError: true,
  })),
  on(SettingsActions.addCity, (state: SettingsState) => ({
    ...state,
    isLoading: true,
  })),
  on(
    SettingsActions.addCitySuccess,
    (state: SettingsState, { cityResponse }) => ({
      ...state,
      cities: [...state.cities, cityResponse],
      isLoading: false,
      isError: false,
    })
  ),
  on(SettingsActions.addCityFailure, (state: SettingsState) => ({
    ...state,
    isLoading: false,
    isError: true,
  })),
  on(SettingsActions.addTransport, (state: SettingsState) => ({
    ...state,
    isLoading: true,
  })),
  on(
    SettingsActions.addTransportSuccess,
    (state: SettingsState, { transportResponse }) => ({
      ...state,
      transports: [...state.transports, transportResponse],
      isLoading: false,
      isError: false,
    })
  ),
  on(SettingsActions.addTransportFailure, (state: SettingsState) => ({
    ...state,
    isLoading: false,
    isError: true,
  })),
  on(SettingsActions.addHosting, (state: SettingsState) => ({
    ...state,
    isLoading: true,
  })),
  on(
    SettingsActions.addHostingSuccess,
    (state: SettingsState, { hostingResponse }) => ({
      ...state,
      hostings: [...state.hostings, hostingResponse],
      isLoading: false,
      isError: false,
    })
  ),
  on(SettingsActions.addHostingFailure, (state: SettingsState) => ({
    ...state,
    isLoading: false,
    isError: true,
  }))
);
