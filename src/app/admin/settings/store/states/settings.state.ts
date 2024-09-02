import { SettingsState } from '../../settings.model';

export const SETTINGS_FEATURE_KEY = 'settings';

export const initialSettingsState: SettingsState = {
  countries: [],
  cities: [],
  hostings: [],
  transports: [],
  isLoading: false,
  isError: false,
};
