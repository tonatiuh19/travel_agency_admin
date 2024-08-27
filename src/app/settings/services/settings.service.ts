import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DOMAIN } from '../../login/login.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public GET_COUNTRIES_URL = `${DOMAIN}/getCountries.php`;
  public GET_CITIES_URL = `${DOMAIN}/getCities.php`;
  public GET_HOSTINGS_URL = `${DOMAIN}/getHostings.php`;
  public GET_TRANSPORTS_URL = `${DOMAIN}/getTransports.php`;
  public INSERT_COUNTRY_URL = `${DOMAIN}/insertCountry.php`;
  public INSERT_CITY_URL = `${DOMAIN}/insertCity.php`;
  public INSERT_HOSTING_URL = `${DOMAIN}/insertHosting.php`;
  public INSERT_TRANSPORT_URL = `${DOMAIN}/insertTransport.php`;

  constructor(private httpClient: HttpClient) {}

  public getCountries(): Observable<any> {
    return this.httpClient.post(this.GET_COUNTRIES_URL, {}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getCities(): Observable<any> {
    return this.httpClient.post(this.GET_CITIES_URL, {}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getHostings(): Observable<any> {
    return this.httpClient.post(this.GET_HOSTINGS_URL, {}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getTransports(): Observable<any> {
    return this.httpClient.post(this.GET_TRANSPORTS_URL, {}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public insertCountry(ctryName: string, id_cont: number): Observable<any> {
    return this.httpClient
      .post(this.INSERT_COUNTRY_URL, {
        ctryName: ctryName,
        id_cont: id_cont,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public insertCity(citName: string, id_country: number): Observable<any> {
    return this.httpClient
      .post(this.INSERT_CITY_URL, {
        citName: citName,
        id_country: id_country,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public insertHosting(hotLabel: string): Observable<any> {
    return this.httpClient
      .post(this.INSERT_HOSTING_URL, {
        hotLabel: hotLabel,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public insertTransport(transportLabel: string): Observable<any> {
    return this.httpClient
      .post(this.INSERT_TRANSPORT_URL, {
        transportLabel: transportLabel,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
