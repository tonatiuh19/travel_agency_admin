import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.css'],
})
export class LocationSelectComponent {
  @Output() citySelected = new EventEmitter<number>();

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
      { id: 1, name: 'China', continentId: 1 },
      { id: 2, name: 'India', continentId: 1 },
      { id: 3, name: 'Japan', continentId: 1 },
      { id: 4, name: 'Germany', continentId: 2 },
      { id: 5, name: 'France', continentId: 2 },
      { id: 6, name: 'Italy', continentId: 2 },
      { id: 7, name: 'United States', continentId: 3 },
      { id: 8, name: 'Canada', continentId: 3 },
      { id: 9, name: 'Mexico', continentId: 3 },
      { id: 10, name: 'Brazil', continentId: 4 },
      { id: 11, name: 'Argentina', continentId: 4 },
      { id: 12, name: 'South Africa', continentId: 5 },
      { id: 13, name: 'Australia', continentId: 6 },
    ],
    cities: [
      { id: 1, name: 'Beijing', countryId: 1 },
      { id: 2, name: 'Shanghai', countryId: 1 },
      { id: 3, name: 'Delhi', countryId: 2 },
      { id: 4, name: 'Mumbai', countryId: 2 },
      { id: 5, name: 'Tokyo', countryId: 3 },
      { id: 6, name: 'Osaka', countryId: 3 },
      { id: 7, name: 'Berlin', countryId: 4 },
      { id: 8, name: 'Munich', countryId: 4 },
      { id: 9, name: 'Paris', countryId: 5 },
      { id: 10, name: 'Lyon', countryId: 5 },
      { id: 11, name: 'Rome', countryId: 6 },
      { id: 12, name: 'Milan', countryId: 6 },
      { id: 13, name: 'New York', countryId: 7 },
      { id: 14, name: 'Los Angeles', countryId: 7 },
      { id: 15, name: 'Toronto', countryId: 8 },
      { id: 16, name: 'Vancouver', countryId: 8 },
      { id: 17, name: 'Mexico City', countryId: 9 },
      { id: 18, name: 'Guadalajara', countryId: 9 },
      { id: 19, name: 'São Paulo', countryId: 10 },
      { id: 20, name: 'Rio de Janeiro', countryId: 10 },
      { id: 21, name: 'Buenos Aires', countryId: 11 },
      { id: 22, name: 'Cape Town', countryId: 12 },
      { id: 23, name: 'Sydney', countryId: 13 },
      { id: 24, name: 'Melbourne', countryId: 13 },
    ],
  };

  selectedContinent: number | null = null;
  selectedCountry: number | null = null;
  filteredCountries: any[] = [];
  filteredCities: any[] = [];

  onContinentChange(event: any) {
    const continentId = event.target.value;
    this.selectedContinent = continentId;
    this.filteredCountries = this.data.countries.filter((c) => {
      return c.continentId == continentId;
    });
    this.selectedCountry = null;
    this.filteredCities = [];
  }

  onCountryChange(event: any) {
    const countryId = event.target.value;
    this.selectedCountry = countryId;
    this.filteredCities = this.data.cities.filter(
      (c) => c.countryId == countryId
    );
  }

  onCityChange(event: any) {
    const cityId = event.target.value;
    this.citySelected.emit(cityId);
  }
}
