import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SETTINGS_FEATURE_KEY } from '../states/settings.state';
import { SettingsState } from '../../settings.model';

export const selectLoginState =
  createFeatureSelector<SettingsState>(SETTINGS_FEATURE_KEY);

export const selectCountries = createSelector(
  selectLoginState,
  (state: SettingsState) => state
);

export const selectCities = createSelector(
  selectLoginState,
  (state: SettingsState) => state
);

export const selectHostings = createSelector(
  selectLoginState,
  (state: SettingsState) => state
);

export const selectTransports = createSelector(
  selectLoginState,
  (state: SettingsState) => state
);
