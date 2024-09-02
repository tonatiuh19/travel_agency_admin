export interface SettingsState {
  countries: CountriesModel[];
  cities: CitiesModel[];
  hostings: HostingsModel[];
  transports: TransportsModel[];
  isLoading?: boolean;
  isError?: boolean;
}

export interface CountriesModel {
  ctryID: number;
  ctryName: string;
  ctryStatus: number;
  contID: number;
}

export interface CitiesModel extends CountriesModel {
  citID: number;
  citName: string;
  citStatus: number;
}

export interface HostingsModel {
  hotID: number;
  hotLabel: string;
  status: number;
}

export interface TransportsModel {
  transportId: number;
  transportLabel: string;
  status: number;
}
