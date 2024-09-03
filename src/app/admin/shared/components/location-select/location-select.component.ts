import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { fromSettings } from '../../../settings/store/selectors';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { SettingsActions } from '../../../settings/store/actions';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.css'],
})
export class LocationSelectComponent implements OnInit {
  @Output() citySelected = new EventEmitter<number>();

  public selectCountries$ = this.store.select(fromSettings.selectCountries);
  public selectCities$ = this.store.select(fromSettings.selectCities);

  private unsubscribe$ = new Subject<void>();

  public isLoading = true;

  data = {
    continents: [
      { id: 1, name: 'Asia' },
      { id: 2, name: 'Europe' },
      { id: 3, name: 'North America' },
      { id: 4, name: 'South America' },
      { id: 5, name: 'Africa' },
      { id: 6, name: 'Australia' },
      { id: 7, name: 'Antarctica' },
    ],
    countries: [
      { ctryID: 1, ctryName: 'China', ctryStatus: 1, contID: 1 },
      { ctryID: 2, ctryName: 'India', ctryStatus: 1, contID: 1 },
      { ctryID: 3, ctryName: 'Japan', ctryStatus: 1, contID: 1 },
      { ctryID: 4, ctryName: 'Germany', ctryStatus: 1, contID: 2 },
      { ctryID: 5, ctryName: 'France', ctryStatus: 1, contID: 2 },
      { ctryID: 6, ctryName: 'Italy', ctryStatus: 1, contID: 2 },
      { ctryID: 7, ctryName: 'United States', ctryStatus: 1, contID: 3 },
      { ctryID: 8, ctryName: 'Canada', ctryStatus: 1, contID: 3 },
      { ctryID: 9, ctryName: 'Mexico', ctryStatus: 1, contID: 3 },
      { ctryID: 10, ctryName: 'Brazil', ctryStatus: 1, contID: 4 },
      { ctryID: 11, ctryName: 'Argentina', ctryStatus: 1, contID: 4 },
      { ctryID: 12, ctryName: 'South Africa', ctryStatus: 1, contID: 5 },
      { ctryID: 13, ctryName: 'Australia', ctryStatus: 1, contID: 6 },
    ],
    cities: [
      {
        citID: 1,
        citName: 'Beijing',
        citStatus: 1,
        ctryID: 1,
        ctryName: 'China',
        ctryStatus: 1,
        contID: 1,
      },
      {
        citID: 2,
        citName: 'Mumbai',
        citStatus: 1,
        ctryID: 2,
        ctryName: 'India',
        ctryStatus: 1,
        contID: 1,
      },
      {
        citID: 3,
        citName: 'Tokyo',
        citStatus: 1,
        ctryID: 3,
        ctryName: 'Japan',
        ctryStatus: 1,
        contID: 1,
      },
      {
        citID: 4,
        citName: 'Berlin',
        citStatus: 1,
        ctryID: 4,
        ctryName: 'Germany',
        ctryStatus: 1,
        contID: 2,
      },
      {
        citID: 5,
        citName: 'Paris',
        citStatus: 1,
        ctryID: 5,
        ctryName: 'France',
        ctryStatus: 1,
        contID: 2,
      },
      {
        citID: 6,
        citName: 'Rome',
        citStatus: 1,
        ctryID: 6,
        ctryName: 'Italy',
        ctryStatus: 1,
        contID: 2,
      },
      {
        citID: 7,
        citName: 'New York',
        citStatus: 1,
        ctryID: 7,
        ctryName: 'United States',
        ctryStatus: 1,
        contID: 3,
      },
      {
        citID: 8,
        citName: 'Toronto',
        citStatus: 1,
        ctryID: 8,
        ctryName: 'Canada',
        ctryStatus: 1,
        contID: 3,
      },
      {
        citID: 9,
        citName: 'Mexico City',
        citStatus: 1,
        ctryID: 9,
        ctryName: 'Mexico',
        ctryStatus: 1,
        contID: 3,
      },
      {
        citID: 10,
        citName: 'São Paulo',
        citStatus: 1,
        ctryID: 10,
        ctryName: 'Brazil',
        ctryStatus: 1,
        contID: 4,
      },
      {
        citID: 11,
        citName: 'Buenos Aires',
        citStatus: 1,
        ctryID: 11,
        ctryName: 'Argentina',
        ctryStatus: 1,
        contID: 4,
      },
      {
        citID: 12,
        citName: 'Cape Town',
        citStatus: 1,
        ctryID: 12,
        ctryName: 'South Africa',
        ctryStatus: 1,
        contID: 5,
      },
      {
        citID: 13,
        citName: 'Sydney',
        citStatus: 1,
        ctryID: 13,
        ctryName: 'Australia',
        ctryStatus: 1,
        contID: 6,
      },
    ],
  };

  selectedContinent: number | null = null;
  selectedCountry: number | null = null;
  filteredCountries: any[] = [];
  filteredCities: any[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(SettingsActions.getCountries());
    this.store.dispatch(SettingsActions.getCities());

    this.selectCountries$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((countries) => {
        this.isLoading = !countries.isLoading;
        this.data.countries = countries.countries || [];
      });

    this.selectCities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cities) => {
        this.isLoading = !cities.isLoading;
        this.data.cities = cities.cities || [];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onContinentChange(event: any) {
    const continentId = event.target.value;
    this.selectedContinent = continentId;

    this.filteredCountries = this.data.countries.filter((c) => {
      return c.contID == continentId;
    });
    this.selectedCountry = null;
    this.filteredCities = [];
  }

  onCountryChange(event: any) {
    const countryId = event.target.value;
    this.selectedCountry = countryId;
    this.filteredCities = this.data.cities.filter((c) => c.ctryID == countryId);
  }

  onCityChange(event: any) {
    const cityId = event.target.value;
    this.citySelected.emit(cityId);
  }
}
